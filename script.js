"use strict";

// fetches json file data and saves it in a variable to be used by different functions, i.e., manager function and
// resize event listener of window
let jsonData = null;
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    jsonData = data
    manager(jsonData)
  })
  .catch(error => console.error('Error fetching data:', error));

// detects resize of screen, calls manager function, manager function replaces old images with new ones if screen type is changed
window.addEventListener("resize", function() {
  manager(jsonData, true)
})

// contains two functions. detectScreenType() which is self explanatory, and extract data, which extracts text and img elements
// of fetched json
function manager(jsonData, resize=false) {
  let screenType = detectScreenType()
  extractData(jsonData, screenType, resize)
};

// based on screen width returns screen type
function detectScreenType() {
  let screenWidth = window.innerWidth;
  if (screenWidth < 650) {
    return "mobile"
  } else if (screenWidth >= 650 && screenWidth < 1024) {
    return "tablet"
  } else if (screenWidth >= 1024) {
    return "desktop"
  };
};

// when the page is loaded for the first time, this function extracts the text data for their related elements(to be created in next steps),
// and image urls of the detected screen type.
// when the page is already loaded but has been resized to the amount that the screen type is changed, this function only extracts 
// the new image urls for the new screen type
function extractData(jsonData, screenType, resize) {
  // page is loaded for the first time
  if (!resize) {
    for (let i=0; i < jsonData.length; i++) {
      const dataImg = jsonData[i].image[`${screenType}`];
      const dataCategory = jsonData[i].category;
      const dataName = jsonData[i].name;
      const dataPrice = jsonData[i].price;
      // creates text and img elements
      createElement(i, dataImg, dataCategory, dataName, dataPrice)
    }
    // page is already loaded, but resized
  } else if (resize) {
    screenType = detectScreenType()
    for (let i=0; i < jsonData.length; i++) {
      const dataImg = jsonData[i].image[`${screenType}`];
      // replaces new images with the old ones
      loadNewImg(i, dataImg)
    }
  }
}

// creates text and img elements
function createElement(i, dataImg, dataCategory, dataName, dataPrice) {  

  // items contains item - each item is a dessert
  const items = document.getElementById("items")
  const item = document.createElement("item");
  item.id = `item${i}`;
  items.appendChild(item);

  // create images
  const img = document.createElement("img");
  img.classList.add("img");
  img.id = `img${i}`;
  img.src = dataImg;
  img.alt = dataImg;
  item.appendChild(img);

  // creating add to cart button
  const addToCart = document.createElement("button");
  addToCart.classList.add("add-to-cart");
  addToCart.id = `add-to-cart${i}`;
  item.appendChild(addToCart);

  // creating icon add to cart
  const iconAddToCart = document.createElement("div");
  iconAddToCart.classList.add("icon-add-to-cart");
  iconAddToCart.id = `icon-add-to-cart${i}`;
  addToCart.appendChild(iconAddToCart);

  // creating icon decrement quantity
  const iconDecrementQuantity = document.createElement("div");
  iconDecrementQuantity.classList.add("icon-decrement-quantity");
  iconDecrementQuantity.id = `icon-decrement-quantity${i}`;
  addToCart.appendChild(iconDecrementQuantity);

  // creating add to cart p element
  const addToCartText = document.createElement("div");
  addToCartText.classList.add("add-to-cart-text");
  addToCartText.id = `add-to-cart-text${i}`;
  addToCartText.innerHTML = "Add to Cart"
  addToCart.appendChild(addToCartText);

  // creating icon increment quantity
  const iconIncrementQuantity = document.createElement("div");
  iconIncrementQuantity.classList.add("icon-increment-quantity");
  iconIncrementQuantity.id = `icon-increment-quantity${i}`;
  addToCart.appendChild(iconIncrementQuantity);

  // creating category element
  const category = document.createElement("p");
  category.innerHTML = dataCategory;
  category.classList.add("category")
  category.id = `category${i}`;
  item.appendChild(category);

  // creating name element
  const name = document.createElement("p");
  name.innerHTML = dataName;
  name.id = `name${i}`;
  name.classList.add("name");
  item.appendChild(name);

  // creating price element
  const price = document.createElement("p");
  price.innerHTML = "$" + dataPrice;
  price.id = `price${i}`;
  price.classList.add("price");
  item.appendChild(price);
}


// replaces new images with the old ones, result will be seen only if the screen type is changed
function loadNewImg(i, dataImg) {
  const img = document.getElementById(`img${i}`)
  img.src = dataImg;
  img.alt = dataImg;
}

window.onload = function() {
  // using this code to add hover effect to .add-to-cart (instead of using css), so that it can be easily removed later
  document.querySelectorAll(".add-to-cart").forEach(el => el.classList.add("add-to-cart-hover"))

  // a function that contains all eventlisteners
  eventListenerFunc();
}


function eventListenerFunc() {
  // click listener for .add-to-cart button
  document.querySelectorAll(".add-to-cart").forEach(addToCart => addToCart.addEventListener("click", function(event) {
    event.stopPropagation()
    addToCartChanger(addToCart)
  }))

  // click listener for .icon-increment-quantity
  document.querySelectorAll(".icon-increment-quantity").forEach(increment => increment.addEventListener("click", function(event) {
    event.stopPropagation()
    iconIncrementChanger(increment)
  }))

  // click listener for .icon-decrement-quantity
  document.querySelectorAll(".icon-decrement-quantity").forEach(decrement => decrement.addEventListener("click", function(event) {
    event.stopPropagation()
    iconDecrementChanger(decrement)
  }))
};

function addToCartChanger(addToCart) {
  let addToCartText = addToCart.querySelector(".add-to-cart-text");
  if (addToCartText.innerHTML === "Add to Cart") {
    addToCart.classList.remove("add-to-cart-hover")
    addToCart.classList.add("add-to-cart-clicked");
    addToCart.querySelector(".icon-add-to-cart").style.display = "none";
    addToCart.querySelector(".icon-increment-quantity").style.display = "block"
    addToCart.querySelector(".icon-decrement-quantity").style.display = "block"
    addToCartText.classList.add("add-to-cart-text-clicked")
    addToCartText.innerHTML = 0
    addToCartText.innerHTML = parseInt(addToCartText.innerHTML, 10) + 1
    cartPanelUpdater(addToCart)
  };
}

function iconIncrementChanger(increment) {
  let addToCartText = increment.previousSibling
  addToCartText.innerHTML = parseInt(addToCartText.innerHTML, 10) + 1
  const addToCart = increment.parentElement
  cartPanelUpdater(addToCart)
}

function iconDecrementChanger(decrement) {
  let addToCartText = decrement.nextSibling
  addToCartText.innerHTML = parseInt(addToCartText.innerHTML, 10) - 1
  const addToCart = decrement.parentElement

  if (addToCartText.innerHTML == 0) {
    // reverts .add-to-cart style and content to its original form    
    addToCartRevert(addToCart, false)
  }
  cartPanelUpdater(addToCart, false)
}

function addToCartRevert(addToCart) {
  addToCart.classList.add("add-to-cart-hover")
  addToCart.classList.remove("add-to-cart-clicked");
  addToCart.querySelector(".icon-add-to-cart").style.display = "block";
  addToCart.querySelector(".icon-increment-quantity").style.display = "none"
  addToCart.querySelector(".icon-decrement-quantity").style.display = "none"
  let addToCartText = addToCart.querySelector(".add-to-cart-text");
  addToCartText.classList.remove("add-to-cart-text-clicked")
  addToCartText.innerHTML = String(addToCartText.innerHTML)
  addToCartText.innerHTML = "Add to Cart"
}

function cartPanelUpdater(addToCart, add=true) {
  let cartPanel = document.querySelector(".cart-panel")
  // updating value of number of h3
  let wholeQuantity = document.getElementById("quantity-whole")
  if (add) {
    wholeQuantity.innerHTML =  parseInt(wholeQuantity.innerHTML, 10) + 1
  } else {
    wholeQuantity.innerHTML =  parseInt(wholeQuantity.innerHTML, 10) - 1
  }

  if (parseInt(wholeQuantity.innerHTML, 10) == 0) {
    cartPanel.querySelector("svg").style.display = "block"
    document.getElementById("added-items").innerHTML = "Your added items will appear here"
  } else if (parseInt(wholeQuantity.innerHTML, 10) == 1) {
    cartPanel.querySelector("svg").style.display = "none"
    document.getElementById("added-items").innerHTML = ""
  }
  if (parseInt(addToCart.querySelector(".add-to-cart-text").innerHTML, 10) > 1) {
    cartItemRowAdder(addToCart, false)
    return
  }
  cartItemRowAdder(addToCart)
}

function cartItemRowAdder(addToCart, addRow=true) {
  let addedItems = document.getElementById("added-items")
  const name = (addToCart.nextSibling.nextSibling).innerHTML
  const price = (addToCart.nextSibling.nextSibling.nextSibling).innerHTML
  const howMany = (addToCart.querySelector(".add-to-cart-text")).innerHTML

  // console.log(addedItems.children)
  if (addRow) {
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

    let removeItem = document.createElement("object")
    removeItem.classList.add("remove-item")
    removeItem.data = "assets/images/icon-remove-item.svg"
    removeItem.type = "image/svg+xml"
    itemRow.appendChild(removeItem)

    const hrEl = document.createElement("hr")
    hrEl.classList.add("hrEl")
    itemRow.appendChild(hrEl)
  } else {
    // find item row that its namepart is similar to name and update it

  }
}
/*
// changer of addToCart button style and its content
function addToCartChanger(addToCart) {
  let addToCartText = addToCart.querySelector(".add-to-cart-text");
  if (addToCartText.innerHTML === "Add to Cart") {
    addToCart.classList.remove("add-to-cart-hover")
    addToCart.classList.add("add-to-cart-clicked");
    addToCart.querySelector(".icon-add-to-cart").style.display = "none";
    addToCart.querySelector(".icon-increment-quantity").style.display = "block"
    addToCart.querySelector(".icon-decrement-quantity").style.display = "block"
    addToCartText.classList.add("add-to-cart-text-clicked")
    addToCartText.innerHTML = 0
    let temp = parseInt(addToCartText.innerHTML, 10)
    temp += 1
    addToCartText.innerHTML = temp  
    cartPanelUpdater(addToCart)
  };
}


function iconIncrementChanger(increment) {
  let addToCartText = increment.previousSibling
  let temp = parseInt(addToCartText.innerHTML, 10)
  temp += 1
  addToCartText.innerHTML = temp
  const addToCart = increment.parentElement
  cartPanelUpdater(addToCart)
}


function iconDecrementChanger(decrement) {
  let addToCartText = decrement.nextSibling
  let temp = parseInt(addToCartText.innerHTML, 10)
  temp -= 1
  addToCartText.innerHTML = temp    
  const addToCart = decrement.parentElement

  if (addToCartText.innerHTML == 0) {
    // reverts .add-to-cart style and content to its original form    
    addToCartRevert(addToCart)
  }
  cartPanelUpdater(addToCart)
}

function addToCartRevert(addToCart) {
  addToCart.classList.add("add-to-cart-hover")
  addToCart.classList.remove("add-to-cart-clicked");
  addToCart.querySelector(".icon-add-to-cart").style.display = "block";
  addToCart.querySelector(".icon-increment-quantity").style.display = "none"
  addToCart.querySelector(".icon-decrement-quantity").style.display = "none"
  let addToCartText = addToCart.querySelector(".add-to-cart-text");
  addToCartText.classList.remove("add-to-cart-text-clicked")
  addToCartText.innerHTML = String(addToCartText.innerHTML)
  addToCartText.innerHTML = "Add to Cart"
}

function cartPanelUpdater(addToCart) {
  let cartPanel = document.querySelector(".cart-panel")
  // updating value of number of h3
  let wholeQuantity = document.getElementById("quantity-whole")
  let addToCartText = addToCart.querySelector(".add-to-cart-text")
  let temp = parseInt(wholeQuantity.innerHTML, 10) + parseInt(addToCartText.innerHTML, 10)
  wholeQuantity.innerHTML = temp

  if (parseInt(wholeQuantity.innerHTML, 10) > 0) {
    cartPanel.querySelector("svg").style.display = "none"
  } else {
    cartPanel.querySelector("svg").style.display = "block"
  }
  cartItemRowAdder(addToCart)
}

function cartItemRowAdder(addToCart) {
  // console.log(document.querySelector("# .item-row"))
  const name = (addToCart.nextSibling.nextSibling).innerHTML
  const price = (addToCart.nextSibling.nextSibling.nextSibling).innerHTML
  const howMany = (addToCart.querySelector(".add-to-cart-text")).innerHTML
  let addedItems = document.getElementById("added-items")

  if (addedItems.children.length == "0") {
    addedItems.innerHTML = ""
  }

  // addedItems constains several item-row
  // each item-row has a p tag containing name of it: .name-part
  // see if there is 'name' in .name-part s
  // if there is that .name-part gets updated
  // console.log(Array.from(addedItems.children).forEach(el => console.log(el.querySelector(".name-part").innerHTML)))
  if (parseInt(howMany, 10) > 1) {
    Array.from(addedItems.children).forEach(el => {
      console.log(el.querySelector(".name-part").innerHTML)
        console.log(name)
        if (el.querySelector(".name-part").innerHTML == name) {
          // update the item-row
          let howManyPart = document.createElement("p")
          howManyPart.classList.add("how-many-part")
          howManyPart.innerHTML = `${howMany}x`
          itemRow.appendChild(howManyPart)

          let totalPricePart = document.createElement("p")
          totalPricePart.classList.add("total-price-part")
          let newPrice = price.replace("$", "")
          totalPricePart.innerHTML = `$${parseInt(newPrice, 10)*parseInt(howMany, 10)}`
          itemRow.appendChild(totalPricePart)        
          return
        }}
    )  
  }

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

  let removeItem = document.createElement("object")
  removeItem.classList.add("remove-item")
  removeItem.data = "assets/images/icon-remove-item.svg"
  removeItem.type = "image/svg+xml"
  itemRow.appendChild(removeItem)

  const hrEl = document.createElement("hr")
  hrEl.classList.add("hrEl")
  itemRow.appendChild(hrEl)
}
*/