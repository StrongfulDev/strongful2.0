class CartRewards {
    constructor(parentContainer) {
        this.container = $(parentContainer);
    }

    rules = []
    allRewardsAmount = 0;
    activeRewards = 0;
    cartTotalValue = 0;
    lastCartTotalValue = 0;

    async init() {
        if (this.rules.length === 0) {
            await this.getRewards();
        }

    subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
      this.checkRules();
    });

    await this.checkRules();
  }

    async checkRules() {
        this.loading(true);

        this.lastCartTotalValue = this.cartTotalValue;
        this.cartTotalValue = await this.getCartTotal();

        await Promise.all(this.rules.map(async (rule, index) => {
            await this.checkAndApplyRule(rule, index);
        }));

        this.loading(false);
    }

    loading(isLoading) {
        if (isLoading) {
            this.container.addClass("loading").find('.rewards-section').animate({
                opacity: 0
            }, 500);
        } else {
            this.container.removeClass("loading").find('.rewards-section').animate({
                opacity: 1
            }, 300);
        }
    }

    async checkAndApplyRule(rule, ruleIndex = 0) {
        let isActive = false;

    switch (rule.condition.type) {
      case "CartAmount":
        const isRewardActive = this.cartHasReward(rule.reward);
        const isAmountGreaterThan = rule.condition.operator === ">=" && this.cartTotalValue >= rule.condition.value;
        const isAmountLessThan = rule.condition.operator === "<=" && this.cartTotalValue <= rule.condition.value;
        isActive = !isRewardActive && (isAmountGreaterThan || isAmountLessThan);
        break;
      case "CartItems":
        break;
    }

        this.toggleReward(rule, isActive, ruleIndex);

        return isActive;
    }

    toggleReward(rule, isActive, ruleIndex) {
        const reward = rule.reward;
        const rewardItem = this.getRewardItemByRule(rule);
        const rewardText = $(".reward-text");

        if (isActive) {
            $(`.reward-item.${reward.active_class}-message`).remove();
            rewardItem.addClass("active-reward");

            this.activeRewards += 1;
        } else {
            if (ruleIndex <= this.activeRewards) {
                const rewardMessage = $(`<span class="${reward.active_class}-message" data-index="${ruleIndex}">${window.rewards_translation[reward.action]?.message}</span>`)
                rewardText.append(rewardMessage);
                rewardText.find('.rewards__free-shipping-amount').text(reward.value - this.cartTotalValue);
            }

            rewardItem.removeClass("active-reward");

            if (this.activeRewards > 0)
                this.activeRewards -= 1;
        }

        const progressPrecentage = (this.cartTotalValue / this.allRewardsAmount) * 100;
        // $('.progress-value').animate({
        //     width: `${progressPrecentage}%`
        // })
        $('.progress-value').css('width', `${progressPrecentage}%`);
    }

    async getRewards() {
        return new Promise((resolve, reject) => {
            jQuery.getJSON("/assets/cart-rewards-rules.json", (rules) => {
                this.rules = rules;

                this.allRewardsAmount = Math.max.apply(Math, rules.map(function (o) {
                    return o.reward.value;
                }));

                resolve(rules);
            });
        });
    }

    // TODO: make this more efficient by caching the response
    getCartTotal() {
        return new Promise((resolve, reject) => {
            jQuery.getJSON("/cart.js", function (cart) {
                resolve(parseInt(cart.total_price / 100));
            });
        });
    }

    getRewardItemByRule(rule) {
        return $(`.reward-item.${rule.reward.active_class}`)
    }

    cartHasReward(reward) {
        return $(`.reward-item.${reward.active_class}.active-reward`).length > 0;
    }
}

// customElements.define("cart-rewards", CartRewards);
