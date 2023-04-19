class CartDrawer extends HTMLElement {
    constructor() {
        super();

        this.addEventListener(
            "keyup",
            (evt) => evt.code === "Escape" && this.close()
        );
        this.querySelector("#CartDrawer-Overlay").addEventListener(
            "click",
            this.close.bind(this)
        );
        this.setHeaderCartIconAccessibility();

        this.checkRewards();
    }

    setHeaderCartIconAccessibility() {
        const cartLink = document.querySelector("#cart-icon-bubble");
        cartLink.setAttribute("role", "button");
        cartLink.setAttribute("aria-haspopup", "dialog");
        cartLink.addEventListener("click", (event) => {
            event.preventDefault();
            this.open(cartLink);
        });
        cartLink.addEventListener("keydown", (event) => {
            if (event.code.toUpperCase() === "SPACE") {
                event.preventDefault();
                this.open(cartLink);
            }
        });
    }

    open(triggeredBy) {
        if (triggeredBy) this.setActiveElement(triggeredBy);
        const cartDrawerNote = this.querySelector('[id^="Details-"] summary');
        if (cartDrawerNote && !cartDrawerNote.hasAttribute("role"))
            this.setSummaryAccessibility(cartDrawerNote);
        // here the animation doesn't seem to always get triggered. A timeout seem to help
        setTimeout(() => {
            this.classList.add("animate", "active");
        });

        this.addEventListener(
            "transitionend",
            () => {
                const containerToTrapFocusOn = this.classList.contains("is-empty")
                    ? this.querySelector(".drawer__inner-empty")
                    : document.getElementById("CartDrawer");
                const focusElement =
                    this.querySelector(".drawer__inner") ||
                    this.querySelector(".drawer__close");
                trapFocus(containerToTrapFocusOn, focusElement);
            },
            {once: true}
        );

        document.body.classList.add("overflow-hidden");
    }

    close() {
        this.classList.remove("active");
        removeTrapFocus(this.activeElement);
        document.body.classList.remove("overflow-hidden");
    }

    setSummaryAccessibility(cartDrawerNote) {
        cartDrawerNote.setAttribute("role", "button");
        cartDrawerNote.setAttribute("aria-expanded", "false");

        if (cartDrawerNote.nextElementSibling.getAttribute("id")) {
            cartDrawerNote.setAttribute(
                "aria-controls",
                cartDrawerNote.nextElementSibling.id
            );
        }

        cartDrawerNote.addEventListener("click", (event) => {
            event.currentTarget.setAttribute(
                "aria-expanded",
                !event.currentTarget.closest("details").hasAttribute("open")
            );
        });

        cartDrawerNote.parentElement.addEventListener("keyup", onKeyUpEscape);
    }

    renderContents(parsedState) {
        this.querySelector(".drawer__inner").classList.contains("is-empty") &&
        this.querySelector(".drawer__inner").classList.remove("is-empty");
        this.productId = parsedState.id;
        this.getSectionsToRender().forEach((section) => {
            const sectionElement = section.selector
                ? document.querySelector(section.selector)
                : document.getElementById(section.id);
            sectionElement.innerHTML = this.getSectionInnerHTML(
                parsedState.sections[section.id],
                section.selector
            );
        });

        setTimeout(() => {
            this.checkRewards();

            this.querySelector("#CartDrawer-Overlay").addEventListener(
                "click",
                this.close.bind(this)
            );
            this.open();
        });
    }

    getSectionInnerHTML(html, selector = ".shopify-section") {
        return new DOMParser()
            .parseFromString(html, "text/html")
            .querySelector(selector).innerHTML;
    }

    getSectionsToRender() {
        return [
            {
                id: "cart-drawer",
                selector: "#CartDrawer",
            },
            {
                id: "cart-icon-bubble",
            },
        ];
    }

    getSectionDOM(html, selector = ".shopify-section") {
        return new DOMParser()
            .parseFromString(html, "text/html")
            .querySelector(selector);
    }

    setActiveElement(element) {
        this.activeElement = element;
    }

    async checkRewards() {
        jQuery.getJSON("/assets/cart-rewards-rules.json", (rule_items) => {
            if (rule_items?.length > 0) {
                for (let i = 0; i < rule_items.length; i++) {
                    const rule_item = rule_items[i];
                    this.checkAndApplyRule(rule_item);
                }
            }
        });
    }

    async checkAndApplyRule(rule_item) {
        let isActive = false;

        switch (rule_item.rule.condition.type) {
            case "CartAmount":
                const cartTotal = await this.cartTotal();
                if (
                    !this.cartHasReward(rule_item.rule.reward) &&
                    rule_item.rule.condition.operator === ">=" &&
                    cartTotal >= rule_item.rule.condition.value
                ) {
                    isActive = true;
                }
                break;
            case "CartItems":
                break;
        }

        this.addProgress(rule_item.rule.reward, isActive);

        if (isActive) {
            this.activateReward(rule_item.rule.reward);
        }

        return isActive;
    }

    // TODO: make this more efficient by caching the response
    cartTotal() {
        return new Promise((resolve, reject) => {
            jQuery.getJSON("/cart.js", function (cart) {
                resolve(parseInt(cart.total_price / 100));
            });
        });
    }

    cartHasReward(reward) {
        return $(`.reward-item.${reward.active_class}.active-reward`).length > 0;
    }

    activateReward(reward) {
        const rewardMessage = $(`<span class="${reward.active_class}-message">${window.rewards_translation[reward.action]?.message}</span>`)
        const progressItem = $(`<span class="${reward.active_class}-progress progress-item" style="flex: ${reward.weight}">&nbsp;</span>`)
        $(`.reward-item.${reward.active_class}`).addClass("active-reward");
        $('.rewards-section').find(".reward-text").append(rewardMessage);
    }

    addProgress(reward, isActive) {
        const progressItemsCount = $(".progress-item").length;
        const order = isActive ? "" : `order: ${progressItemsCount};`
        const progressItem = $(`<span class="${reward.active_class}-progress progress-item ${isActive ? "active" : ""}" style="flex: ${reward.weight}; ${order}">&nbsp;</span>`)
        $('.track-progress').append(progressItem);
    }
}

customElements.define("cart-drawer", CartDrawer);

class CartDrawerItems extends CartItems {
    getSectionsToRender() {
        return [
            {
                id: "CartDrawer",
                section: "cart-drawer",
                selector: ".drawer__inner",
            },
            {
                id: "cart-icon-bubble",
                section: "cart-icon-bubble",
                selector: ".shopify-section",
            },
        ];
    }
}

customElements.define("cart-drawer-items", CartDrawerItems);
