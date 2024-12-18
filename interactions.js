"use strict";
console.log(Date.now(),  "interactions.js")

window.onload = function() {
  document.querySelectorAll(".add-to-cart").forEach(addToCart => {
      addToCart.classList.add("add-to-cart-hover");
      addToCart.addEventListener("click", function() {
        console.log(Date.now(),  "addToCart eventListener added")
        let addToCartText = addToCart.querySelector(".add-to-cart-text")
        let modifyCartRow;
        if (addToCartText.innerHTML == "Add to Cart") {
          addToCartChanger(addToCart)
          imageStyleChanger(addToCart)
          modifyCartRow = true;
        }
        if (document.getElementById("added-items").innerHTML == "Your added items will appear here") {
          yourCartpanelToggler(true)
        }
        if (modifyCartRow) {
          CartrowModifier(addToCart)
          modifyCartRow = false
          removeItemEventListener(addToCart)
        }
        yourCartNumberChanger()
        orderTotalCalculator()
      });
  });

  // click listener for .icon-increment-quantity
  document.querySelectorAll(".icon-increment-quantity").forEach(increment => increment.addEventListener("click", function(event) {
    console.log(Date.now(),  ".icon-increment-quantity eventListener added")
    event.stopPropagation()
    const addToCart = increment.parentElement
    
    let toIncrement = true;
    addToCartChanger(addToCart, toIncrement)
    CartrowModifier(addToCart, toIncrement)
    yourCartNumberChanger()
    orderTotalCalculator()
  }))

  // click listener for .icon-decrement-quantity
  document.querySelectorAll(".icon-decrement-quantity").forEach(decrement => decrement.addEventListener("click", function(event) {
    console.log(Date.now(),  ".icon-decrement-quantity eventListener added")
    event.stopPropagation()
    const addToCart = decrement.parentElement
    let toDecrement = true;
    addToCartChanger(addToCart, undefined, toDecrement)
    CartrowModifier(addToCart, undefined, toDecrement)
    yourCartNumberChanger()
    if (document.getElementById("added-items").innerHTML == "") {
      yourCartpanelToggler(false)
    }
    orderTotalCalculator()
  }))

  document.getElementById("confirm-order").addEventListener("click", function() {
    console.log(Date.now(),  "#confirm-order eventListener added")
    const darkOverlay = document.getElementById("dark-overlay")
    const confirmOrderCart = document.getElementById("confirm-order-cart")
    const addedItemsList = document.getElementById("added-items-list")
    const cartPanel = document.querySelector(".cart-panel")
    const addedItemsConfirm = document.getElementById("added-items-confirm")

    darkOverlay.style.display = "block"
    confirmOrderCart.style.zIndex = "1"
    confirmOrderCart.style.opacity = "1"
    addedItemsConfirm.innerHTML = document.getElementById("added-items").innerHTML
    addedItemsConfirm.querySelectorAll(".remove-item").forEach(el => {el.remove()})
    // Array.from(addedItemsConfirm.children).forEach(el => console.log(Date.now(),  el.querySelector(".name-part").innerHTML))
    addedItemsConfirm.querySelectorAll(".name-part").forEach(el => {
      let thumbnailAddress = window.thumbnailLoader(el.innerHTML)

      // create thumbnail
      const thumbnail = document.createElement("img");
      thumbnail.src = thumbnailAddress;
      thumbnail.alt = thumbnailAddress;
      thumbnail.classList.add("thumbnail");
      el.parentElement.appendChild(thumbnail);

      // el.parentElement.classList.add("")
      console.log(Date.now(),  el.parentElement)
    })
    const orderTotalSumConfirm = document.getElementById("confirm-order-cart").querySelector("#order-total-sum")
    orderTotalSumConfirm.innerHTML = cartPanel.querySelector("#order-total-sum").innerHTML
    orderTotalSumConfirm.id = "order-total-sum-confirm"
    document.querySelector("#order-total-sum-confirm").parentElement.style.color = "black"
    console.log(Date.now(),  document.querySelector("#order-total-sum-confirm").parentElement)
  })
}

function removeItemEventListener(addToCart) {
  console.log(Date.now(),  "removeItemEventListener function ran")
  const addedItems = document.getElementById("added-items")
  const name = (addToCart.nextSibling.nextSibling).innerHTML
  let correspondingRow;
  Array.from(addedItems.children).forEach(el =>{
    if (el.querySelector(".name-part").innerHTML == name) {
      correspondingRow = el;
    }
  })
  correspondingRow.querySelector(".remove-item").addEventListener("click", function() {
    let toRemove = true;
    addToCartChanger(addToCart, undefined, undefined, toRemove)
    CartrowModifier(addToCart, undefined, undefined, toRemove)
    yourCartNumberChanger()
    if (document.getElementById("added-items").innerHTML == "") {
      yourCartpanelToggler(false)
    }
    let removeStyle;
    imageStyleChanger(addToCart, removeStyle=true)
    orderTotalCalculator()
  })
}


function addToCartChanger(addToCart, toIncrement=false, toDecrement=false, toRemove=false) {
  console.log(Date.now(),  "addToCartChanger function ran")  
  let addToCartText = addToCart.querySelector(".add-to-cart-text")
  // making sure a clicked addtocart cant be clicked again
  if (addToCartText.innerHTML == "Add to Cart") {
    addToCart.classList.remove("add-to-cart-hover")
    addToCart.classList.add("add-to-cart-clicked");
    addToCart.querySelector(".icon-add-to-cart").style.display = "none";
    addToCart.querySelector(".icon-increment-quantity").style.display = "block"
    addToCart.querySelector(".icon-decrement-quantity").style.display = "block"
    addToCartText.classList.add("add-to-cart-text-clicked")
    addToCartText.innerHTML = 0
    addToCartText.innerHTML = parseFloat(addToCartText.innerHTML) + 1
  } else if (toIncrement) {
    addToCartText.innerHTML = parseFloat(addToCartText.innerHTML) + 1    
  } else if (toDecrement) {
    addToCartText.innerHTML = parseFloat(addToCartText.innerHTML) - 1
    if (addToCartText.innerHTML == "0") {
      addToCart.classList.add("add-to-cart-hover")
      addToCart.classList.remove("add-to-cart-clicked");
      addToCart.querySelector(".icon-add-to-cart").style.display = "block";
      addToCart.querySelector(".icon-increment-quantity").style.display = "none"
      addToCart.querySelector(".icon-decrement-quantity").style.display = "none"
      addToCartText.classList.remove("add-to-cart-text-clicked")
      addToCartText.innerHTML = "Add to Cart"
      let removeStyle;
      imageStyleChanger(addToCart, removeStyle=true)
    }
  } else if (toRemove) {
    addToCart.classList.add("add-to-cart-hover")
    addToCart.classList.remove("add-to-cart-clicked");
    addToCart.querySelector(".icon-add-to-cart").style.display = "block";
    addToCart.querySelector(".icon-increment-quantity").style.display = "none"
    addToCart.querySelector(".icon-decrement-quantity").style.display = "none"
    addToCartText.classList.remove("add-to-cart-text-clicked")
    addToCartText.innerHTML = "Add to Cart"    
  }
}

function imageStyleChanger(addToCart, removeStyle=false) {
  console.log(Date.now(),  "imageStyleChanger function ran")
  const img = addToCart.previousElementSibling
  if (removeStyle) {
    img.classList.remove("img-clicked")    
    return
  }
  img.classList.add("img-clicked")
}

// if upgrade = true, svg and "Your added items will appear here" get deleted for new elements
function yourCartpanelToggler(upgrade=true) {
  console.log(Date.now(),  "yourCartpanelToggler function ran")
  const cartPanel = document.querySelector(".cart-panel")
  const svg = cartPanel.querySelector("svg")
  const addedItems = document.getElementById("added-items")
  const orderTotal = document.getElementById("order-total")
  const carbonNeutral = document.getElementById("carbon-neutral")
  const confirmOrder = document.getElementById("confirm-order")

  if (upgrade) {
    svg.style.display = "none"
    orderTotal.style.display = "flex"
    carbonNeutral.style.display = "flex"
    confirmOrder.style.display = "block"
    addedItems.innerHTML = ""
    return
  }
  svg.style.display = "block"
  orderTotal.style.display = "none"
  carbonNeutral.style.display = "none"
  confirmOrder.style.display = "none"
  addedItems.innerHTML = "Your added items will appear here"
}

// changer the number inside paranthesis of your cart main header, if add = true, the number gets incremented by 1, else decremented by 1
function yourCartNumberChanger() {
  console.log(Date.now(),  "yourCartNumberChanger function ran")
  let yourCartQuantity = document.getElementById("quantity-whole")
  let addedItems = document.getElementById("added-items")
  let number = 0
  Array.from(addedItems.children).forEach(el =>{
    let howManyPart = parseFloat(el.querySelector(".how-many-part").innerHTML)
    number += howManyPart
  })  
  yourCartQuantity.innerHTML = number
}

function CartrowModifier(addToCart, toIncrement=false, toDecrement=false, toRemove=false) {
  console.log(Date.now(),  "CartrowModifier function ran")
  let addedItems = document.getElementById("added-items")
  const name = (addToCart.nextSibling.nextSibling).innerHTML
  const price = (addToCart.nextSibling.nextSibling.nextSibling).innerHTML
  const howMany = (addToCart.querySelector(".add-to-cart-text")).innerHTML
  let correspondingRow;

  if (toIncrement || toDecrement || toRemove) {
    Array.from(addedItems.children).forEach(el =>{
      if (el.querySelector(".name-part").innerHTML == name) {
        correspondingRow = el;
      }
    })
  }

  if (!toIncrement && !toDecrement && !toRemove) {
    // parent element of details of added item
    let itemRow = document.createElement("div")
    itemRow.classList.add("item-row")
    addedItems.appendChild(itemRow)

 
    let namePart = document.createElement("p")
    namePart.classList.add("name-part")
    namePart.innerHTML = name
    itemRow.appendChild(namePart)

    let howManyPart = document.createElement("p")
    howManyPart.classList.add("how-many-part")
    howManyPart.innerHTML = `${howMany}x`
    itemRow.appendChild(howManyPart)

    let unitPricePart = document.createElement("p")
    unitPricePart.classList.add("unit-price-part")
    unitPricePart.innerHTML = `@${price}`
    itemRow.appendChild(unitPricePart)

    let totalPricePart = document.createElement("p")
    totalPricePart.classList.add("total-price-part")
    let newPrice = +price.replace("$", "")
    totalPricePart.innerHTML = `$${+newPrice*+howMany}`
    itemRow.appendChild(totalPricePart)

    let removeItem = document.createElement("div")
    removeItem.classList.add("remove-item")
    itemRow.appendChild(removeItem) 

    const hrEl = document.createElement("hr")
    hrEl.classList.add("hrEl")
    itemRow.appendChild(hrEl)      
  } else if (toIncrement) {
    let howManyPart = correspondingRow.querySelector(".how-many-part")
    howManyPart.innerHTML = parseFloat(howManyPart.innerHTML) + 1 + "x"
    let totalPricePart = correspondingRow.querySelector(".total-price-part")
    let unitPricePart = correspondingRow.querySelector(".unit-price-part")
    let temp = totalPricePart.innerHTML.replace("$", "")
    let temp2 = unitPricePart.innerHTML.replace("@$", "")

    totalPricePart.innerHTML = `$${parseFloat(temp) + parseFloat(temp2)}`
  } else if (toDecrement) {
    let howManyPart = correspondingRow.querySelector(".how-many-part")
    howManyPart.innerHTML = parseFloat(howManyPart.innerHTML) - 1 + "x"
    if (howManyPart.innerHTML == "0x") {
      correspondingRow.remove()
      return
    }
    let totalPricePart = correspondingRow.querySelector(".total-price-part")
    let unitPricePart = correspondingRow.querySelector(".unit-price-part")
    let temp = totalPricePart.innerHTML.replace("$", "")
    let temp2 = unitPricePart.innerHTML.replace("@$", "")

    totalPricePart.innerHTML = `$${parseFloat(temp) - parseFloat(temp2)}`
  } else if (toRemove) {
    correspondingRow.remove()  
  }
}

function orderTotalCalculator() {
  console.log(Date.now(),  "orderTotalCalculator function ran")
  const addedItems = document.getElementById("added-items")
  let sum = 0;
  Array.from(addedItems.children).forEach(el => {
    let totalPrice = +el.querySelector(".total-price-part").innerHTML.replace("$", "")
    sum += totalPrice
  })
  let orderTotalSum = document.getElementById("order-total-sum")
  orderTotalSum.innerHTML = sum.toFixed(2)
}

