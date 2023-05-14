class CartRewards {
	constructor(parentContainer) {
		this.container = $(parentContainer);
	}

	cart;
	rules = []
	allRewardsAmount = 0;
	activeRewards = 0;
	cartTotalValue = 0;
	lastCartTotalValue = 0;

	async init() {
		this.rules = window.rewardsRules;

		console.log("Reward rules", this.rules);

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
		this.cart = await this.getCart();
		this.cartTotalValue = parseInt(this.cart.total_price / 100)
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
				const isRewardActive = this.cartHasReward(rule);
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

	async toggleRewardItem(isActive, rule) {
		const rewardItem = this.getRewardItemByRule(rule);

		if (isActive) {
			rewardItem.addClass("active-reward");
		} else {
			rewardItem.removeClass("active-reward");
		}

		switch (rule.reward.action) {
			case "gift_product":
				this.handleGiftReward(rule, isActive);
				break;
		}
	}

	async removeProduct(productId) {
		const config = fetchConfig('javascript');

		config.body = JSON.stringify({
			id: productId,
			quantity: 0
		});

		const res = await fetch(`${routes.cart_change_url}`, config);
		return res.json();
	}

	async handleGiftReward(rule, isActive) {
		if (!isActive) {
			for (const productGid of rule.reward.products) {
				const productId = productGid.split("/").pop();
				if (this.productsExistInCart([productId])) {
					this.removeProduct(productId)
				}
			}

			return;
		}

		for (const productGid of rule.reward.products) {
			const productId = productGid.split("/").pop();

			if (this.productsExistInCart([productId]))
				return;

			if (rule.reward.product_method === "Add all products to cart") {
				this.addProduct(productId)
			} else {
				const res = await this.addProduct(productId)

				if (res.items.length > 0) {
					return;
				}
			}
		}

	}

	async addProduct(productId) {
		const config = fetchConfig('javascript');

		config.body = JSON.stringify({
			items: [{
				quantity: 1,
				id: productId
			}]
		});

		const res = await fetch(`${routes.cart_add_url}`, config);
		return res.json();
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

	getCart() {
		return new Promise((resolve, reject) => {
			jQuery.getJSON("/cart.js", function (cart) {
				resolve(cart);
			});
		});
	}

	getRewardItemByRule(rule) {
		return $(`.reward-item.${rule.element_class}`)
	}

	cartHasReward(rule, ruleIndex) {
		if (rule.reward.action === "gift_product") {
			let productsExist = this.productsExistInCart(rule.reward.products);

			if (rule.reward.product_method === "Add all products to cart") {
				return productsExist === rule.reward.products.length;
			} else {
				return !!productsExist;
			}
		}

		return ruleIndex <= this.activeRewards
	}

	productsExistInCart(productGids) {
		let productsExist = 0;

		for (const productGid of productGids) {
			const productId = parseInt(productGid.split("/").pop());
			const isProductExists = this.cart.items.some(item => item.id === productId);

			if (isProductExists) {
				productsExist += 1;
			}
		}

		return productsExist;
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
