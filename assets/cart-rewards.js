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

    this.handleRewards(rule, isActive, ruleIndex);

    return isActive;
  }

  handleRewards(rule, isActive, ruleIndex) {
    if (isActive)
      this.activeRewards += 1;
    else
      this.activeRewards -= 1;

    this.toggleMessage(isActive, rule, ruleIndex);
    this.toggleRewardItem(isActive, rule, ruleIndex);
    this.trackProgress();
  }

  toggleRewardItem(isActive, rule) {
    const rewardItem = this.getRewardItemByRule(rule);

    if (isActive) {
      rewardItem.addClass("active-reward");
    } else {
      rewardItem.removeClass("active-reward");
    }
  }

  trackProgress() {
    const progressPrecentage = (this.cartTotalValue / this.allRewardsAmount) * 100;
    $('.progress-value').animate({
      width: `${progressPrecentage}%`
    })
    // $('.progress-value').css('width', `${progressPrecentage}%`);
  }

  toggleMessage(isActive, rule, ruleIndex) {
    const reward = rule.reward;
    const rewardText = $(".reward-text");
    const messageClass = `.${reward.active_class}-message`;
    const currentMessage = $(messageClass);

    console.log("NININTINTNTINTN", isActive, ruleIndex, this.activeRewards)

    if (isActive) {
      currentMessage.remove();
    } else if (ruleIndex < this.activeRewards && currentMessage.length <= 0) {
      const rewardMessage = $(`<span class="${messageClass}" data-index="${ruleIndex}">${window.rewards_translation[reward.action]?.message}</span>`)
      rewardText.append(rewardMessage);
      rewardText.find('.rewards__free-shipping-amount').text(reward.value - this.cartTotalValue);
    }
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

  loading(isLoading) {
    // if (isLoading) {
    //     this.container.addClass("loading").find('.rewards-section').animate({
    //         opacity: 0
    //     }, 500);
    // } else {
    //     this.container.removeClass("loading").find('.rewards-section').animate({
    //         opacity: 1
    //     }, 300);
    // }
  }
}

// customElements.define("cart-rewards", CartRewards);
