let datepickerWd = document.getElementById("dateime");
const targetPriceDiv = document.querySelector(".target-price-wrapper");
const isCustomAmountInput = document.getElementById("custom-amount-input");
let giftCardValueWd = null;
let countryCodeIni = "972";
let initialBlessing = "";
let sendWayWd = "email";
let initialValue = "";
let srcValue;
let stepWd = 1;
let emailWd = "";
let phoneNumberWd = "";
let recipientNameWd = "";
let blessingWd = "";
let buyerNameWd = "";
let dateToSend = "";
let currentImageIndex = 0;
const stickyEl = document.querySelector(".sticky-cta");
document.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= documentHeight) {
    stickyEl.style.position = "absolute";
  } else {
    stickyEl.style.position = "fixed";
  }
});

if (window.innerWidth <= 576) {
  const parent = document.getElementById("dsk-img");
  const child = document.querySelector(".shadow-img");
  parent.removeChild(child);
}
// const cardDesc = document.querySelector(".wd-card-description");
// const heightToCardData = cardDesc.offsetHeight - stickyEl.offsetHeight;
// document.querySelector(".wd-card-data").style.height = `${heightToCardData}px`;
if (datepickerWd) {
  const now = new Date();
  const year = now.getFullYear();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  const hours = ("0" + now.getHours()).slice(-2);
  const minutes = ("0" + now.getMinutes()).slice(-2);

  const minDatetime = year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
  datepickerWd.min = minDatetime;
  datepickerWd.value = minDatetime;

}

if (document.querySelector("native-carousel-item")) {
  document.querySelector(".gap-div").style.paddingBottom = "0px";
}

let currSrc = document.querySelector(".selected-style");

if (currSrc) {
  srcValue = currSrc.getAttribute("src");
}
const imagesArray = Array.prototype.slice.call(document.querySelectorAll(`.i-image`));
if (imagesArray.length) {
  imagesArray[0].classList.add("selected-style");
}
function nextStepWd(st) {
  if (st === 2) {
    document.getElementById("wd-page-title-1").classList.add("d-none");
    document.getElementById("wd-page-title-2").classList.remove("d-none");
    document.querySelector(".hide-desktop").classList.add("d-none");

    const divDetails = Array.prototype.slice.call(document.querySelectorAll(`.g-details`));
    for (let i = 0; i < divDetails.length; i++) {
      divDetails[i].classList.add("g-details-unset");
    }
    document.getElementById("continue-and-review-btn").classList.remove("buttons-d-none");
    document.getElementById("go-to-details-btn").classList.add("buttons-d-none");

    const divAmount = Array.prototype.slice.call(document.querySelectorAll(`.s-amount`));
    for (let i = 0; i < divAmount.length; i++) {
      divAmount[i].classList.add("d-none");
    }
  } else if (st === 3) {
    document.getElementById("wd-page-title-2").classList.add("d-none");
    document.getElementById("wd-page-title-3").classList.remove("d-none");

    const divDetails = Array.prototype.slice.call(document.querySelectorAll(`.g-details`));
    for (let i = 0; i < divDetails.length; i++) {
      divDetails[i].classList.remove("g-details-unset");
    }
    document.getElementById("add-to-cart-btn").classList.remove("buttons-d-none");
    document.getElementById("edit-btn").classList.remove("buttons-d-none");
    document.getElementById("add-to-cart-btn").classList.remove("add-btn");
    document.getElementById("continue-and-review-btn").classList.add("buttons-d-none");

    document.getElementById("review-wrapper").classList.remove("d-none");
    document.getElementById("total-wrapper").classList.remove("hide-mobile");
    buildPreviewTexts();
  }

  document.querySelector(".gap-div").scrollTop = 0;
}
function goBackWd(st) {
  if (st === 1) {
    document.getElementById("wd-page-title-1").classList.remove("d-none");
    document.getElementById("wd-page-title-2").classList.add("d-none");
    document.querySelector(".hide-desktop").classList.remove("d-none");

    const divDetails = Array.prototype.slice.call(document.querySelectorAll(`.g-details`));
    for (let i = 0; i < divDetails.length; i++) {
      divDetails[i].classList.remove("g-details-unset");
    }
    document.getElementById("continue-and-review-btn").classList.add("buttons-d-none");
    document.getElementById("go-to-details-btn").classList.remove("buttons-d-none");

    const divAmount = Array.prototype.slice.call(document.querySelectorAll(`.s-amount`));
    for (let i = 0; i < divAmount.length; i++) {
      divAmount[i].classList.remove("d-none");
    }
  } else if (st === 2) {
    document.getElementById("wd-page-title-2").classList.remove("d-none");
    document.getElementById("wd-page-title-3").classList.add("d-none");

    const divDetails = Array.prototype.slice.call(document.querySelectorAll(`.g-details`));
    for (let i = 0; i < divDetails.length; i++) {
      divDetails[i].classList.add("g-details-unset");
    }
    document.getElementById("add-to-cart-btn").classList.add("buttons-d-none");
    document.getElementById("add-to-cart-btn").classList.add("add-btn");
    document.getElementById("edit-btn").classList.add("buttons-d-none");
    document.getElementById("continue-and-review-btn").classList.remove("buttons-d-none");

    document.getElementById("review-wrapper").classList.add("d-none");
    document.getElementById("total-wrapper").classList.add("hide-mobile");
  }
  document.querySelector(".gap-div").scrollTop = 0;
}
function focusOnInputWd(inputId) {
  document.getElementById(inputId).focus();
}
function buildPreviewTexts() {
  const headerBuyer = document.getElementById("preview-buyer");
  const cardValue = document.getElementById("preview-value");
  const recipientNameEl = document.getElementById("preview-recipient-name");
  const previewBlessing = document.getElementById("preview-blessing");
  const voucherValue = document.getElementById("preview-v-value");
  const fromBuyer = document.getElementById("preview-buyer-name");
  const previewImage = document.getElementById("preview-image");

  headerBuyer.innerHTML = buyerNameWd;
  cardValue.innerHTML = giftCardValueWd;
  recipientNameEl.innerHTML = recipientNameWd;
  previewBlessing.innerHTML = blessingWd;
  voucherValue.innerHTML = giftCardValueWd;
  fromBuyer.innerHTML = ` ${buyerNameWd}`;
  previewImage.src = document.getElementById("main-image").getAttribute("src");
}
function toggleBlessingsModal() {
  document.querySelector(".blessings-modal").classList.toggle("d-none");
  if (initialBlessing) {
    document.getElementById(`bless-${bless - active}`).classList.add("country-active");
    document.getElementById(`svg-${initialBlessing}`).classList.remove("d-none");
  }
}
function checkIfConfirmAmountBtnDisabled() {
  document.getElementById("go-to-details-btn").disabled = !Boolean(giftCardValueWd);
}
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}
function checkIfDisableButtons(e = null, id = null) {
  if (e) {
    const value = e.target.value;
    if (id === "buyer-name") {
      buyerNameWd = value;
    } else if (id === "messageblessing") {
      blessingWd = value;
    } else if (id === "recipient-name") {
      recipientNameWd = value;
    } else if (id === "email-to-send") {
      emailWd = value;
    } else if (id === "phone-number-to-send") {
      let phoneValue = value.replace(/[^0-9]/g, "");
      document.getElementById("phone-number-to-send").value = phoneValue;
      phoneNumberWd = phoneValue;
    } else if (id === "dateime") {
      dateToSend = value;
    }
  }
  const price = giftCardValueWd;
  const phoneNumberPrefix = countryCodeIni;
  const btn = document.getElementById("add-to-cart-btn");
  const btn2 = document.getElementById("continue-and-review-btn");
  let isNotValid = false;

  if (id === "phone-number-to-send" && e.target.value === "") {
    document.getElementById("phone-label").classList.remove("d-none");
  }
  if (id === "phone-number-to-send" && e.target.value !== "") {
    document.getElementById("phone-label").classList.add("d-none");
  }

  if (sendWayWd === "email" && (!email || !isValidEmail(emailWd))) {
    isNotValid = true;
  }
  if (sendWayWd === "phone" && (!phoneNumberWd || !phoneNumberPrefix)) {
    isNotValid = true;
  }
  if (!price || !recipientNameWd || !blessingWd || !buyerNameWd) {
    isNotValid = true;
  }

  btn.disabled = isNotValid;
  btn2.disabled = isNotValid;
}
checkIfDisableButtons();
function updateInitialBlessing(bless, text) {
  const fixedBlessing = bless.replaceAll("-", " ");
  const translatedBlessing = {
    Birthday: "יום הולדת",
    "Thank you": "תודה",
    "Happy holiday": "חג שמח",
    "I love you": "אני אוהב אותך"
  };
  document.getElementById("bless-selected").style.color = "#111952";
  //document.querySelector(".arrow-cb").style.marginTop = "10px";
  document.getElementById("bless-span").classList.add("b-selected");
  document.getElementById("bless-selected").innerHTML = translatedBlessing[fixedBlessing];

  const countriesList = Array.prototype.slice.call(document.querySelectorAll(`.bless`));
  const svgsList = Array.prototype.slice.call(document.querySelectorAll(`.ok-b-svg`));
  for (let i = 0; i < countriesList.length; i++) {
    countriesList[i].classList.remove("bless-active");
  }
  for (let x = 0; x < svgsList.length; x++) {
    svgsList[x].classList.add("d-none");
  }
  document.getElementById(`bless-${bless}`).classList.add("bless-active");
  document.getElementById(`bls-svg-${bless}`).classList.remove("d-none");
  document.getElementById("messageblessing").value = text;
  blessingWd = text;

  toggleBlessingsModal();
  checkIfDisableButtons();
}
if (!isCustomAmountInput) {
  document.querySelector(".initial-val").classList.add("active-variant");
  const valueText = document.querySelector(".label-value").innerHTML.trim();
  document.querySelector(".price-value").innerHTML = valueText;
  debugger;
  const arr = Array.prototype.slice.call(document.querySelectorAll(".wd-card-price"));
  for (let i = 0; i < arr.length; i++) {
    arr[i].innerHTML = valueText;
  }
  giftCardValueWd = valueText.match(/(?:\D*)(\d+)(?:\D*)/)[1];
  checkIfConfirmAmountBtnDisabled();
}

let imageSrc = document.getElementById("main-image").getAttribute("src");

const handleShowTargetPriceMessage = (currValue, targetPrice) => {
  if (targetPrice > currValue) {
    targetPriceDiv.classList.remove("d-none");
  } else if (targetPrice < currValue || !currValue || currValue === 0) {
    targetPriceDiv.classList.add("d-none");
  }
};

const changeSendWay = (method) => {
  if (method === "phone") {
    sendWayWd = "phone";
    document.getElementById("phone-wrapper").classList.remove("d-none");
    document.getElementById("email-wrapper").classList.add("d-none");
    document.getElementById("inner-phone").classList.add("show-inner");
    document.getElementById("inner-email").classList.remove("show-inner");
  } else if (method === "email" && document.getElementById("phone")) {
    sendWayWd = "email";
    document.getElementById("email-wrapper").classList.remove("d-none");
    document.getElementById("phone-wrapper").classList.add("d-none");
    document.getElementById("inner-phone").classList.remove("show-inner");
    document.getElementById("inner-email").classList.add("show-inner");
  }
};
function getImagesSrcWd(images, index) {
  const imagesArr = images;
  let fixedImages = imagesArr.replace("[", "").replace("]", "");
  const fixedImagesArr = fixedImages.split("files");
  fixedImagesArr.shift();
  if (index === "inc" && currentImageIndex + 1 < fixedImagesArr.length) {
    currentImageIndex++;
  } else if (index === "dec" && fixedImagesArr.length > 0 && currentImageIndex !== 0) {
    currentImageIndex--;
  }
  selcetStyle(`files${fixedImagesArr[currentImageIndex]}`);
}
const selcetStyle = (id) => {
  const input = document.getElementById(`style-${id}`);
  const image = document.getElementById(id);
  imageSrc = id;
  const arr = Array.prototype.slice.call(document.querySelectorAll(".i-image"));
  currentImageIndex = arr.findIndex((el) => el.id === id);

  for (let i = 0; i < arr.length; i++) {
    arr[i].classList.remove("selected-style");
    const id = arr[i].getAttribute("id");
    document.getElementById(`style-${id}`).checked = false;
  }
  image.classList.add("selected-style");
  input.checked = true;
  const mainImageArr = Array.prototype.slice.call(document.querySelectorAll("#main-image"));
  const src = image.getAttribute("src");
  for (let i = 0; i < mainImageArr.length; i++) {
    mainImageArr[i].src = src;
  }
};

const setInitialValue = (value, targetPrice, currency) => {
  const targetPriceInt = +targetPrice;
  const currentValueInt = isNaN(+value.slice(1)) ? value : +value.slice(1);
  targetPriceDiv.classList.remove("d-none");
  const selected = document.getElementById(value);
  const variantArray = Array.prototype.slice.call(document.querySelectorAll(".initial-val"));

  for (let i = 0; i < variantArray.length; i++) {
    variantArray[i].classList.remove("active-variant");
  }
  selected.classList.add("active-variant");
  initialValue = value;
  giftCardValueWd = currentValueInt;
  document.querySelector(".price-value").innerHTML = value;
  debugger;
  const cardPriceCodeElements = Array.prototype.slice.call(document.querySelectorAll(".wd-card-price"));
  for (const element of cardPriceCodeElements) {
    element.innerHTML = `${currency}${currentValueInt}`;
  }
  handleShowTargetPriceMessage(currentValueInt, targetPriceInt);
};

function formatDateToCustomString() {
  const date = new Date(dateToSend);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const month = months[date.getUTCMonth()];
  const day = days[date.getUTCDay()];
  const year = date.getUTCFullYear();
  const hour = date.getUTCHours().toString().padStart(2, "0");
  const minute = date.getUTCMinutes().toString().padStart(2, "0");
  const second = date.getUTCSeconds().toString().padStart(2, "0");

  const formattedDate = `${day} ${month} ${date.getUTCDate()} ${year} ${hour}:${minute}:${second} GMT+0000 (Coordinated Universal Time)`;

  return formattedDate;
}
const setCustomAmount = () => {
  if (isCustomAmountInput && +isCustomAmountInput.value !== 0) {
    const url = new URL(window.location.href);
    const myShopifyUrl = url.hostname;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        value: +isCustomAmountInput.value,
        myShopifyUrl: myShopifyUrl
      })
    };
    const prefix = countryCodeIni;
    const phoneNumber = document.getElementById("phone-number-to-send")?.value || "";
    const phoneString = phoneNumber ? `+${prefix}${phoneNumber}` : "";
    fetch(
      "https://api.wegifts.io/api/shop/createCustomVariant", //TO BE REPLACED WITH OUR DOMAIN
      options
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        fetch("/cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            id: data.variantId,
            quantity: 1,
            properties: {
              "שם השולח": buyerNameWd,
              "שם המקבל": recipientNameWd,
              "ברכה": blessingWd,
              "מייל למשלוח": emailWd,
              "טלפון": phoneNumber.length > 6 ? phoneString : "",
              "זמן השליחה": dateToSend ? formatDateToCustomString() : "",
              _Style: imageSrc
            }
          })
        })
          .then((response) => (window.location.href = `https://${myShopifyUrl}/cart`))
          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
  }
};
const showBiggerMessageWithCustomValue = (targetPrice, currency) => {
  const targetPriceInt = +targetPrice;
  const customValue = +isCustomAmountInput.value;
  giftCardValueWd = customValue;
  document.querySelector(".price-value").innerHTML = `${customValue}${currency}`;
  document.querySelector(".wd-card-price").innerHTML = `${customValue}${currency}`;
  handleShowTargetPriceMessage(customValue, targetPriceInt);
  if (stepWd === 1) {
    checkIfConfirmAmountBtnDisabled();
  } else {
    checkIfDisableButtons();
  }
};

const addInitialVariantToCart = () => {
  const currentValue = initialValue.replace(/[^\d,.]/g, "");
  const url = new URL(window.location.href);
  const myShopifyUrl = url.hostname;
  const prefix = countryCodeIni;
  const phoneString = prefix ? `+${prefix}${phoneNumberWd}` : "";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      value: currentValue,
      myShopifyUrl: myShopifyUrl
    })
  };

  fetch("https://api.wegifts.io/api/shop/createCustomVariant", options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          id: data.variantId,
          quantity: 1,
          properties: {
            "שם השולח": buyerNameWd,
            "שם המקבל": recipientNameWd,
            "ברכה": blessingWd,
            "מייל למשלוח": emailWd,
            "טלפון": phoneNumberWd.length > 6 ? phoneString : "",
            "זמן השליחה": dateToSend ? formatDateToCustomString() : "",
            _Style: imageSrc
          }
        })
      })
        .then((response) => (window.location.href = `https://${myShopifyUrl}/cart`))
        .catch((error) => console.log(error));
    })
    .catch((err) => console.log(err));
};

const addToCartWd = () => {
  const btn = document.getElementById("add-to-cart-btn");
  const span = btn.querySelector("span");
  const initialText = span.innerHTML;
  span.innerHTML = "כמה רגעים והגיפטקארד מוכן";
  btn.disabled = true;
  if (!isCustomAmountInput) {
    addInitialVariantToCart();
  } else {
    setCustomAmount();
  }
  span.innerHTML = initialText;
  btn.disabled = false;
};

if (!isCustomAmountInput) {
  document.querySelector(".initial-val").click();
}
