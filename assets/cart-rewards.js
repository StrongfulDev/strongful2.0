class CartRewards {
	constructor(parentContainer) {
		// parentContainer is the <cart-drawer> element as a jQuery object
		this.container = $(parentContainer);
		this.cartElement = document.querySelector("cart-notification") || document.querySelector("cart-drawer");
		this.featuredCollection = this.container.find(".featured-collection");
	}

	cart;
	error;
	rules = window.rewardsRules; // typically loaded from a global or script tag
	allRewardsAmount = 0;
	cartTotalValue = 0;
	lastCartTotalValue = 0;
	activeRewards = 0;

	async init() {
		// 1. Compute the max threshold from your rules
		this.allRewardsAmount = Math.max.apply(
			Math,
			this.rules.map((o) => o.condition.value)
		);

		// 2. Subscribe to cart updates (skip if from 'cart-rewards')
		subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
			if (event.source === "cart-rewards") return;
			this.checkRules();
		});

		// 3. Check rules right away
		await this.checkRules();
	}

	async checkRules() {
		this.loading(true);

		// (A) Get cart
		this.lastCartTotalValue = this.cartTotalValue;
		this.cart = await this.getCart();

		// (B) Subtract any non-shipping items from total
		this.cart.items.forEach((item) => {
			if (item.requires_shipping === false) {
				this.cart.total_price -= item.price * item.quantity;
			}
		});
		this.cartTotalValue = this.cart.total_price / 100;

		// (C) Determine which rules are currently satisfied
		const satisfiedRules = [];
		this.rules.forEach((rule, index) => {
			if (this.checkCondition(rule)) {
				satisfiedRules.push({ rule, index });
			}
		});

		// (D) Toggle freebies (gift products) if the condition changed
		for (let i = 0; i < this.rules.length; i++) {
			const rule = this.rules[i];
			const isConditionMet = satisfiedRules.some((r) => r.rule === rule);
			const isRewardInCart = this.cartHasReward(rule);

			if (isRewardInCart !== isConditionMet) {
				await this.toggleReward(isConditionMet, rule);
			}
		}

		// (E) Remove any freebies that are no longer valid
		await this.removeNonGiftFreeProducts();

		// (F) Additional package protection logic, etc.
		if (this.cartTotalValue < 10) {
			this.removePackageProtection();
		} else {
			const packageProtectionAdded = this.cart.items.find((item) => item.id === 41547480268940);
			if (!packageProtectionAdded) {
				// this.addProduct(41547480268940);
			}
		}

		if (this.cart.items.length === 0) {
			this.clearCart();
		}

		// (G) Update the count of active rules, show the message
		this.activeRewards = satisfiedRules.length;
		this.trackProgress();
		this.showRewardsMessage(satisfiedRules);

		this.loading(false);
	}

	// ──────────────────────────────────────────────────────────────────────────
	// FOCUS ON THIS METHOD for the `.rewards__missing_amount` logic
	// ──────────────────────────────────────────────────────────────────────────
	showRewardsMessage(satisfiedRules) {
		const rewardText = $(".reward-text");

		// Highlight active rules
		this.rules.forEach((rule) => {
			const rewardItem = this.getRewardItemByRule(rule);
			const isMet = satisfiedRules.some((r) => r.rule === rule);
			if (isMet) {
				rewardItem.addClass("active-reward");
			} else {
				rewardItem.removeClass("active-reward");
			}
		});

		// CASE 1: No rule is satisfied => show how much is missing for the FIRST rule
		if (satisfiedRules.length === 0) {
			const firstRule = this.rules[0];
			if (firstRule) {
				const missing = (firstRule.condition.value - this.cartTotalValue).toFixed(0);

				// This line REPLACES the ".rewards__missing_amount" text in your rule message
				let msg = firstRule.condition.message;

				// If you want a currency sign, do:
				// let msg = firstRule.condition.message.replace(
				//   ".rewards__missing_amount",
				//   `₪${missing}`
				// );
				// ...existing code...
				// ...existing code...
				let cleanMessage = firstRule.condition.message.replace(/\r?\n|\r/g, " ").replace(/\s\s+/g, " ");

				// Insert a space before and after the replaced amount
				let newMessage = cleanMessage.replace(
					'<span class="rewards__missing_amount"></span>',
					` <span class="rewards__missing_amount">${missing}₪</span> `
				);

				rewardText.html(newMessage);
				console.log(newMessage);
				console.log("msg", msg);
				console.log("Missing amount:", missing);
				console.log("Rule message:", msg);
			}

			if (this.featuredCollection) {
				this.featuredCollection.addClass("disabled");
			}
			return;
		}

		// CASE 2: Some rules satisfied => find the highest threshold
		const highestRuleInfo = satisfiedRules.reduce((prev, current) => {
			if (current.rule.condition.value > prev.rule.condition.value) {
				return current;
			}
			return prev;
		});
		const { rule } = highestRuleInfo;

		// Check if there's a higher rule
		const nextRule = this.rules.find((r) => r.condition.value > rule.condition.value);
		if (nextRule) {
			const missing = (nextRule.condition.value - this.cartTotalValue).toFixed(0);
			if (missing > 0) {
				rewardText.html(`<span>Spend ₪${missing} more to unlock the next reward!</span>`);
				if (this.featuredCollection) {
					this.featuredCollection.addClass("disabled");
				}
				return;
			}
		}

		// CASE 3: If we are at/above the highest threshold => show that reward's success msg
		rewardText.html(rule.reward.message);

		if (this.featuredCollection) {
			this.featuredCollection.addClass("disabled");
			$(".cart-drawer .variant_selector.active").removeClass("active");
			$(".cart-drawer .variant_modal_overlay").hide();
		}
	}
	// ──────────────────────────────────────────────────────────────────────────

	async removeNonGiftFreeProducts() {
		const giftProductIds = this.rules
			.filter((rule) => rule.reward.action === "gift_product")
			.flatMap((rule) => this.getProductIdsFromRule(rule));

		for (const item of this.cart.items) {
			if (item.price === 0 && !giftProductIds.includes(item.id.toString())) {
				await this.removeProduct(item.id);
			}
		}
	}

	async clearCart() {
		jQuery.post("/cart/change.js", { quantity: 0, id: "41547480268940" }, null, "json");
		$.ajax({
			type: "POST",
			url: "/cart/clear.js",
			dataType: "json",
			success: function () {
				console.log("cart cleared");
			},
			error: function (xhr, status, error) {
				console.log("Error clearing cart:", error);
			},
		});
	}

	checkCondition(rule) {
		const isRightQuantity = this.checkProductQuantity(rule);
		const isAmountGreaterThan =
			rule.condition.operator === "Greater than or equal" && this.cartTotalValue >= rule.condition.value;
		const isAmountLessThan =
			rule.condition.operator === "Less than or equal" && this.cartTotalValue <= rule.condition.value;

		if (rule.condition.type === "CartAmount") {
			return (isRightQuantity || isRightQuantity === null) && (isAmountGreaterThan || isAmountLessThan);
		}
		return false;
	}

	async toggleReward(isConditionMet, rule) {
		switch (rule.reward.action) {
			case "gift_product":
				await this.handleGiftReward(rule, isConditionMet);
				break;
		}
	}

	async handleGiftReward(rule, isConditionMet) {
		const oldCartTotalValue = this.lastCartTotalValue;
		const productIds = this.getProductIdsFromRule(rule);
		const isJustOne = rule.reward.product_method === "Just one that's available";

		for (const productId of productIds) {
			const productInCart = this.productsExistInCart([productId]);
			const isRightQuantity = this.checkProductQuantity(rule, productId);

			if (productInCart && (!isConditionMet || !isRightQuantity)) {
				await this.removeProduct(productId);
				continue;
			}

			if (
				!productInCart &&
				isConditionMet &&
				rule.reward.giftMethod === "automatic" &&
				this.cartTotalValue > oldCartTotalValue
			) {
				const res = await this.addProduct(productId);
				if (isJustOne && res?.items?.length > 0) {
					return;
				}
			}
		}
	}

	async removeProduct(productId) {
		const drawerItems = document.querySelector("cart-drawer-items");
		const cartItem = this.cart.items.find((item) => item.id === parseInt(productId));
		if (!cartItem) return;

		const cartItemIndex = $(`.cart-item[data-id="${productId}"]`).data("index");
		if (typeof cartItemIndex !== "undefined") {
			drawerItems.updateQuantity(cartItemIndex, 0);
		}
	}

	async removePackageProtection() {
		const drawerItems = document.querySelector("cart-drawer-items");
		const packageProtection = this.cart.items.find((item) => item.id === 41547480268940);
		if (!packageProtection) return;

		const packageProtectionIndex = $(`.cart-item[data-id="41547480268940"]`).data("index");
		if (typeof packageProtectionIndex !== "undefined") {
			drawerItems.updateQuantity(packageProtectionIndex, 0);
		}
	}

	async addProduct(productId) {
		const config = fetchConfig("javascript");
		let data = {
			items: [{ quantity: 1, id: productId }],
		};

		if (this.cartElement) {
			data.sections = this.cartElement.getSectionsToRender().map((section) => section.id);
			data.sections_url = window.location.pathname;
			this.cartElement.setActiveElement(document.activeElement);
		}

		config.body = JSON.stringify(data);

		try {
			const res = await fetch(`${routes.cart_add_url}`, config);
			const response = await res.json();

			publish(PUB_SUB_EVENTS.cartUpdate, {
				source: "cart-rewards",
				productVariantId: productId,
			});

			this.cartElement.renderContents(response);
			return response;
		} catch (e) {
			console.error(e);
		} finally {
			if (this.cartElement && this.cartElement.classList.contains("is-empty")) {
				this.cartElement.classList.remove("is-empty");
			}
		}
	}

	trackProgress() {
		const progressPercentage = (this.cartTotalValue / this.allRewardsAmount) * 100;
		$(".progress-value").animate({ width: `${progressPercentage}%` });
	}

	getCart() {
		return new Promise((resolve) => {
			jQuery.getJSON("/cart.js", function (cart) {
				resolve(cart);
			});
		});
	}

	getRewardItemByRule(rule) {
		return $(`.reward-item.${rule.element_class}`);
	}

	cartHasReward(rule) {
		if (rule.reward.action === "gift_product") {
			const productIds = this.getProductIdsFromRule(rule);
			const productsExist = this.productsExistInCart(productIds);

			if (rule.reward.product_method === "Add all products to cart") {
				return productsExist && productsExist.length === productIds.length;
			} else {
				return productsExist && productsExist.length >= 1;
			}
		}
		return false;
	}

	checkProductQuantity(rule) {
		if (rule.reward.action !== "gift_product") return true;
		const acceptableQuantity = 1;
		const productIds = this.getProductIdsFromRule(rule);
		const productIdsInCart = this.productsExistInCart(productIds);

		if (!productIdsInCart && rule.reward.giftMethod === "automatic") {
			return null;
		}

		if (rule.reward.product_method === "Add all products to cart") {
			for (const pid of productIdsInCart) {
				const product = this.cart.items.find((item) => item.id === parseInt(pid));
				if (product && product.quantity !== acceptableQuantity) {
					return false;
				}
			}
			return true;
		}

		// "Just one"
		if (productIdsInCart && productIdsInCart[0]) {
			const product = this.cart.items.find((item) => item.id === parseInt(productIdsInCart[0]));
			return product?.quantity === acceptableQuantity;
		}
	}

	productsExistInCart(productIds) {
		const existing = productIds.filter((pid) => this.cart.items.some((item) => item.id === parseInt(pid)));
		return existing.length > 0 ? existing : false;
	}

	getProductIdsFromRule(rule) {
		return rule.reward.products.map((gid) => gid.split("/").pop()).filter((id) => !!id);
	}

	loading(isLoading) {
		// if (isLoading) {
		//   this.container.addClass("loading")
		//       .find('.rewards-section').animate({ opacity: 0 }, 500);
		// } else {
		//   this.container.removeClass("loading")
		//       .find('.rewards-section').animate({ opacity: 1 }, 300);
		// }
	}

	handleErrorMessage(errorMessage = false) {
		if (this.hideErrors) return;

		this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector(".cart-rewards__error-message-wrapper");
		if (!this.errorMessageWrapper) return;

		this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector(".cart-rewards__error-message");

		this.errorMessageWrapper.toggleAttribute("hidden", !errorMessage);
		if (errorMessage) {
			this.errorMessage.textContent = errorMessage;
		}
	}
}
// If you want to define a custom element, you could do:
// customElements.define("cart-rewards", CartRewards);
