"use strict";

window.onload = function() {
  document.querySelectorAll(".add-to-cart").forEach(addToCart => {
      addToCart.classList.add("add-to-cart-hover");
      addToCart.addEventListener("click", function() {
        addToCartChanger(addToCart)
        imageStyleChanger(addToCart)
        if (document.getElementById("added-items").innerHTML == "Your added items will appear here") {
          yourCartpanelToggler(true)
        }
        yourCartNumberChanger(true)
        CartrowModifier(addToCart)
      });
  });
}

// document.querySelectorAll(".add-to-cart").forEach(pointer => pointer.addEventListener("click", function(pointer) {
  //   console.log(pointer.target)
  //   // const addToCart = pointer.target
  //   // Array.from(addToCart).forEach(addToCart => addToCart.classList.add("add-to-cart-hover"))
  //   // addToCartChanger(addToCart)
  //   // imageStyleChanger()
  //   // yourCartpanelToggler()
  //   // yourCartNumberChanger()
  //   // CartrowModifier()
  //   // totlaordercalculator()
  // }))


function addToCartChanger(addToCart) {
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
    addToCartText.innerHTML = parseInt(addToCartText.innerHTML, 10) + 1
  }
}

function  imageStyleChanger(addToCart) {
  const img = addToCart.previousElementSibling
  img.classList.add("img-clicked")
}

// if upgrade = true, svg and "Your added items will appear here" get deleted for new elements
function yourCartpanelToggler(upgrade=true) {
  const cartPanel = document.querySelector(".cart-panel")
  const svg = cartPanel.querySelector("svg")
  const addedItems = document.getElementById("added-items")
  
  if (upgrade) {
    svg.style.display = "none"
    addedItems.innerHTML = ""
    return
  }
  svg.style.display = "block"
  addedItems.innerHTML = "Your added items will appear here"
}

// changer the number inside paranthesis of your cart main header, if add = true, the number gets incremented by 1, else decremented by 1
function yourCartNumberChanger(add=true) {
  let yourCartQuantity = document.getElementById("quantity-whole")
  if (add) {
    yourCartQuantity.innerHTML =  parseInt(yourCartQuantity.innerHTML, 10) + 1        
    return
  }
  yourCartQuantity.innerHTML =  parseInt(yourCartQuantity.innerHTML, 10) - 1
}

function  CartrowModifier(addToCart) {
  let addedItems = document.getElementById("added-items")
  const name = (addToCart.nextSibling.nextSibling).innerHTML
  const price = (addToCart.nextSibling.nextSibling.nextSibling).innerHTML
  const howMany = (addToCart.querySelector(".add-to-cart-text")).innerHTML

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
  let newPrice = price.replace("$", "")
  totalPricePart.innerHTML = `$${parseInt(newPrice, 10)*parseInt(howMany, 10)}`
  itemRow.appendChild(totalPricePart)

  let removeItem = document.createElement("div")
  removeItem.classList.add("remove-item")
  itemRow.appendChild(removeItem) 

  const hrEl = document.createElement("hr")
  hrEl.classList.add("hrEl")
  itemRow.appendChild(hrEl)  
}

// let addedItems = document.getElementById("added-items")
// const name = (addToCart.nextSibling.nextSibling).innerHTML
// const price = (addToCart.nextSibling.nextSibling.nextSibling).innerHTML
// const howMany = (addToCart.querySelector(".add-to-cart-text")).innerHTML

// // parent element of details of added item
// let itemRow = document.createElement("div")
// itemRow.classList.add("item-row")
// addedItems.appendChild(itemRow)

// let namePart = document.createElement("p")
// namePart.classList.add("name-part")
// namePart.innerHTML = name
// itemRow.appendChild(namePart)

// let howManyPart = document.createElement("p")
// howManyPart.classList.add("how-many-part")
// howManyPart.innerHTML = `${howMany}x`
// itemRow.appendChild(howManyPart)

// let unitPricePart = document.createElement("p")
// unitPricePart.classList.add("unit-price-part")
// unitPricePart.innerHTML = `@${price}`
// itemRow.appendChild(unitPricePart)

// let totalPricePart = document.createElement("p")
// totalPricePart.classList.add("total-price-part")
// let newPrice = price.replace("$", "")
// totalPricePart.innerHTML = `$${parseInt(newPrice, 10)*parseInt(howMany, 10)}`
// itemRow.appendChild(totalPricePart)

// let removeItem = document.createElement("div")
// removeItem.classList.add("remove-item")
// itemRow.appendChild(removeItem) 

// const hrEl = document.createElement("hr")
// hrEl.classList.add("hrEl")
// itemRow.appendChild(hrEl)

/*
  let cartPanel = document.querySelector(".cart-panel")
  // updating value of number of h3
  let wholeQuantity = document.getElementById("quantity-whole")
  if (!decrement) {
    wholeQuantity.innerHTML =  parseInt(wholeQuantity.innerHTML, 10) + 1        
  } else {
    wholeQuantity.innerHTML =  parseInt(wholeQuantity.innerHTML, 10) - 1    
  }

  if (!decrement && parseInt(wholeQuantity.innerHTML, 10) == 1) {
    cartPanel.querySelector("svg").style.display = "none"
    document.getElementById("added-items").innerHTML = ""
  } else if (decrement && parseInt(wholeQuantity.innerHTML, 10) == 0) {
    cartPanel.querySelector("svg").style.display = "block"
    document.getElementById("added-items").innerHTML = "Your added items will appear here"
  }

  if (!increment && !decrement) {
    cartItemRowAdder(addToCart)
  } else if (increment) {
    cartItemRowUpdater(addToCart, "increment")
  } else if (decrement) {
    cartItemRowUpdater(addToCart, "decrement")
  }
*/