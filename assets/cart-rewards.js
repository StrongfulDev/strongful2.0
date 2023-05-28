class CartRewards {
	constructor(parentContainer) {
		this.container = $(parentContainer);
		this.cartElement = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
	}

	cart;
	error;
	rules = window.rewardsRules
	allRewardsAmount = 0;
	activeRulesCount = 0;
	activeRules = [];
	cartTotalValue = 0;
	cartOriginalTotalValue = 0;
	lastCartTotalValue = 0;
	lastCartOriginalTotalValue = 0;

	async init() {
		console.log("Reward rules", this.rules);

		this.allRewardsAmount = Math.max.apply(Math, this.rules.map(function (o) {
			return o.condition.value;
		}));

		subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
			if (event.source === 'cart-rewards') return;

			this.checkRules();
		});

		await this.checkRules();
	}

	async checkRules() {

		this.loading(true);

		this.lastCartTotalValue = this.cartTotalValue;
		this.lastCartOriginalTotalValue = this.cartOriginalTotalValue;
		this.cart = await this.getCart();
		this.cartTotalValue = parseInt(this.cart.total_price / 100);
		this.cartOriginalTotalValue = parseInt(this.cart.original_total_price / 100);
		this.activeRulesCount = 0

		this.rules.forEach((rule, index) => {
			const isConditionMet = this.checkCondition(rule);
			const isRewardInCart = this.cartHasReward(rule, index);
			const rewardItem = this.getRewardItemByRule(rule);
			let toggeled;

			// If the state changed
			if (isRewardInCart !== isConditionMet) {
				toggeled = this.toggleReward(isConditionMet, rule);
			}

			if (toggeled || (isRewardInCart && isConditionMet)) {
				this.activeRulesCount += 1;
				this.activeRules.push(rule);
			} else {
				this.activeRulesCount -= 1;
				this.activeRules = this.activeRules.filter((activeReward) => activeReward.id !== rule.id);
			}

			this.trackProgress(rule);
			this.toggleMessage(isConditionMet, rule, index);

			if (isConditionMet) {
				rewardItem.addClass("active-reward");
			} else {
				rewardItem.removeClass("active-reward");
			}
		});

		this.loading(false);
	}

	checkCondition(rule) {
		let isConditionMet = false;

		if (rule.condition.type === "CartAmount") {
			const isRightQuantity = this.checkProductQuantity(rule);
			const isAmountGreaterThan = rule.condition.operator === "Greater than or equal" && this.cartTotalValue >= rule.condition.value;
			const isAmountLessThan = rule.condition.operator === "Less than or equal" && this.cartTotalValue <= rule.condition.value;
			isConditionMet = (isRightQuantity || isRightQuantity === null) && (isAmountGreaterThan || isAmountLessThan)
		} else if (rule.condition.type === "OriginalCartAmount") {
			const isRightQuantity = this.checkProductQuantity(rule);
			const isAmountGreaterThan = rule.condition.operator === "Greater than or equal" && this.cartOriginalTotalValue >= rule.condition.value;
			const isAmountLessThan = rule.condition.operator === "Less than or equal" && this.cartOriginalTotalValue <= rule.condition.value;
			isConditionMet = (isRightQuantity || isRightQuantity === null) && (isAmountGreaterThan || isAmountLessThan)
		}

		return isConditionMet;
	}

	async toggleReward(isConditionMet, rule) {
		switch (rule.reward.action) {
			case "gift_product":
				await this.handleGiftReward(rule, isConditionMet);
				break;
		}

		return isConditionMet;
	}

	async handleGiftReward(rule, isConditionMet) {
		const productIds = this.getProductIdsFromRule(rule)
		const isJustOne = rule.reward.product_method === "Just one that's available";

		for (const productId of productIds) {
			const productInCart = this.productsExistInCart([productId]);
			const isRightQuantity = this.checkProductQuantity(rule, productId);

			if (productInCart && (!isConditionMet || !isRightQuantity)) {
				await this.removeProduct(productId)
				continue;
			}

			if (!productInCart && isConditionMet) {
				const res = await this.addProduct(productId)
				if (isJustOne && res?.items?.length > 0) {
					return;
				}
			}
		}
	}

	async removeProduct(productId) {
		const drawerItems = document.querySelector('cart-drawer-items');

		const cartItem = this.cart.items.find(item => item.id === parseInt(productId));
		const cartItemIndex = $(`.cart-item[data-id="${productId}"]`).data('index')

		if (cartItem)
			drawerItems.updateQuantity(cartItemIndex, 0);
	}

	async addProduct(productId) {
		const config = fetchConfig('javascript');

		let data = {
			items: [{
				quantity: 1,
				id: productId
			}]
		}

		if (this.cartElement) {
			data.sections = this.cartElement.getSectionsToRender().map((section) => section.id);
			data.sections_url = window.location.pathname;
			this.cartElement.setActiveElement(document.activeElement);
		}

		config.body = JSON.stringify(data);

		try {
			const res = await fetch(`${routes.cart_add_url}`, config);
			const response = await res.json();

			if (false && response.status) {
				console.log("Error adding product to cart", response);

				publish(PUB_SUB_EVENTS.cartError, {
					source: 'cart-rewards',
					productVariantId: productId,
					errors: response.description,
					message: response.message
				});

				this.handleErrorMessage(response.description);

				return;
			}

			publish(PUB_SUB_EVENTS.cartUpdate, {
				source: 'cart-rewards',
				productVariantId: productId
			});

			this.cartElement.renderContents(response);

			// if (quickAddModal) {
			// 	document.body.addEventListener('modalClosed', () => {
			// 		setTimeout(() => {
			// 			this.cartElement.renderContents(response)
			// 		});
			// 	}, {once: true});
			// 	quickAddModal.hide(true);
			// } else {
			// 	this.cartElement.renderContents(response);
			// }

			return response
		} catch (e) {
			console.error(e);
		} finally {
			if (this.cartElement && this.cartElement.classList.contains('is-empty')) this.cartElement.classList.remove('is-empty');
		}
	}

	trackProgress(rule) {
		// const activeRule = this.activeRules.find(activeRuleToCheck => activeRuleToCheck.id === rule.id);
		//
		// if (activeRule && activeRule.reward?.action === "gift_product") {
		// 	const productsPrice = this.getProductPrice(rule);
		// 	this.cartOriginalTotalValue += productsPrice;
		// }

		const progressPercentage = (this.cartTotalValue / this.allRewardsAmount) * 100;
		$('.progress-value').animate({
			width: `${progressPercentage}%`
		})
	}

	getProductPrice(rule) {
		const ruleProducts = this.getProductIdsFromRule(rule);
		const products = this.cart.items.filter(item => ruleProducts.indexOf(item.id.toString()) !== -1);

		if (products.length <= 0)
			return 0;

		let price = 0;

		products.forEach(product => {
			price += product.original_line_price || product.grams;
		});

		return price;
	}

	toggleMessage(isConditionMet, rule, ruleIndex) {

		const rewardText = $(".reward-text");
		const isLatestActiveRule = ruleIndex + 1 >= this.activeRulesCount && isConditionMet;
		const isLatestDeactivatedRule = ruleIndex - 1 === this.activeRulesCount && !isConditionMet;
		const missingAmount = rule.condition.value - this.cartTotalValue;

		// Apply condition message.
		if (isLatestDeactivatedRule && missingAmount > 0) {
			const rewardMessage = $(`<span class="${rule.element_class}-message" data-index="${ruleIndex}">${rule.condition.message}</span>`);
			rewardMessage.find('.rewards__missing_amount').text(missingAmount);
			rewardText.html(rewardMessage);
		}

		// Apply reward message.
		else if (isLatestActiveRule) {
			rewardText.html(rule.reward.message);
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
			const productIds = rule.reward.products.map(productGid => productGid.split("/").pop()).filter((id) => !!id);
			let productsExist = this.productsExistInCart(productIds);

			if (rule.reward.product_method === "Add all products to cart") {
				// UNTESTED
				return productsExist === rule.reward.products.length;
			} else {
				return productsExist?.length >= 1;
			}
		}

		return ruleIndex < this.activeRulesCount
	}

	checkProductQuantity(rule) {
		if (rule.reward.action !== "gift_product") return true;

		const acceptableQuantity = 1;
		const productIds = this.getProductIdsFromRule(rule)
		const productIdsInCart = this.productsExistInCart(productIds);

		if (!productIdsInCart) return null;

		if (rule.reward.product_method === "Add all products to cart") {
			for (const productId of productIdsInCart) {
				const product = this.cart.items.find(item => item.id === parseInt(productId));
				if (product.quantity !== acceptableQuantity)
					return false
			}

			return true;
		}

		const product = this.cart.items.find(item => item.id === parseInt(productIdsInCart[0]));
		return product.quantity === acceptableQuantity;
	}

	productsExistInCart(productIds) {
		let productsExist = [];

		for (const productId of productIds) {
			const isProductExists = this.cart.items.some(item => item.id === parseInt(productId));

			if (isProductExists) {
				productsExist.push(productId);
			}
		}

		return productsExist.length > 0 ? productsExist : false;
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

	getProductIdsFromRule(rule) {
		return rule.reward.products.map(productGid => productGid.split("/").pop()).filter((id) => !!id);
	}

	handleErrorMessage(errorMessage = false) {
		if (this.hideErrors) return;

		this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.cart-rewards__error-message-wrapper');
		if (!this.errorMessageWrapper) return;
		this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.cart-rewards__error-message');

		this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

		if (errorMessage) {
			this.errorMessage.textContent = errorMessage;
		}
	}
}

// customElements.define("cart-rewards", CartRewards);
