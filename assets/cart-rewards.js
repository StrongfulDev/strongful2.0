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
		this.rules = window.rewards_rules;

		this.allRewardsAmount = Math.max.apply(Math, this.rules.map(function (o) {
			return o.condition.value;
		}));

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
			const isActive = this.handleCondition(rule);
			this.handleReward(rule, isActive, index);
		});

		this.loading(false);
	}

	handleCondition(rule) {
		let isActive = false;

		switch (rule.condition.type) {
			case "CartAmount":
				const isRewardActive = this.cartHasReward(rule.reward);
				const isAmountGreaterThan = rule.condition.operator === "Greater than or equal" && this.cartTotalValue >= rule.condition.value;
				const isAmountLessThan = rule.condition.operator === "Less than or equal" && this.cartTotalValue <= rule.condition.value;
				isActive = !isRewardActive && (isAmountGreaterThan || isAmountLessThan);

				break;
		}

		return isActive;
	}

	handleReward(rule, isActive, ruleIndex) {
		if (isActive)
			this.activeRewards += 1;

		this.trackProgress();
		this.toggleRewardItem(isActive, rule);
		this.toggleMessage(isActive, rule, ruleIndex);
	}

	toggleRewardItem(isActive, rule) {
		const rewardItem = this.getRewardItemByRule(rule);

		switch (rule.reward.action) {
			case "gift_product":
				const productId = rule.reward.product_id;
				this.giftProduct(productId)
				break;
		}

		if (isActive) {
			rewardItem.addClass("active-reward");
		} else {
			rewardItem.removeClass("active-reward");
		}
	}

	async giftProduct(productId) {
		jQuery.post("/cart/add.js", {
			quantity: 1,
			id: productId
		}, (response) => {
			console.log(response);
		});
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
		const messageClass = `${reward.element_class}-message`;
		const currentMessage = $(`.${messageClass}`);

		if (ruleIndex === this.activeRewards) {
			if (currentMessage.length <= 0) {
				if (isActive) {
					currentMessage.remove();
				} else {
					const rewardMessage = $(`<span class="${messageClass}" data-index="${ruleIndex}">${rule.condition.message}</span>`);
					rewardText.html(rewardMessage);
				}
			}

			rewardText.find('.rewards__missing_amount').text(rule.condition.value - this.cartTotalValue);
		} else if (ruleIndex === this.rules.length - 1 && isActive) {
			rewardText.text(rule.reward.message);
		}
	}

	getCartTotal() {
		return new Promise((resolve, reject) => {
			jQuery.getJSON("/cart.js", function (cart) {
				resolve(parseInt(cart.total_price / 100));
			});
		});
	}

	getRewardItemByRule(rule) {
		return $(`.reward-item.${rule.element_class}`)
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
