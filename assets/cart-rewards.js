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
		this.activeRewards = 0

		this.rules.forEach((rule, index) => {
			this.checkAndApplyRule(rule, index);
		});

		this.loading(false);
	}

	checkAndApplyRule(rule, ruleIndex = 0) {
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

		if (isActive)
			this.activeRewards += 1;

		this.handleRewards(rule, isActive, ruleIndex);

		return isActive;
	}

	handleRewards(rule, isActive, ruleIndex) {
		this.trackProgress();
		this.toggleRewardItem(isActive, rule);
		this.toggleMessage(isActive, rule, ruleIndex);
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
	}

	toggleMessage(isActive, rule, ruleIndex) {
		const reward = rule.reward;
		const rewardText = $(".reward-text");
		const messageClass = `${reward.active_class}-message`;
		const currentMessage = $(`.${messageClass}`);

		if (ruleIndex === this.activeRewards) {
			if (currentMessage.length <= 0) {
				if (isActive) {
					currentMessage.remove();
				} else {
					const rewardMessage = $(`<span class="${messageClass}" data-index="${ruleIndex}">${window.rewards_translation[reward.action]?.message}</span>`);
					rewardText.html(rewardMessage);
				}
			}

			rewardText.find('.rewards__missing_amount').text(reward.value - this.cartTotalValue);
		} else if (ruleIndex === this.rules.length - 1 && isActive) {
			rewardText.text("");
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

	cartHasReward(reward, ruleIndex) {
		return ruleIndex <= this.activeRewards
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
