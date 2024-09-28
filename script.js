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

// has two functions inside itself. detectScreenType() which is self explanatory, and extract data, which extracts text and img elements
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

  // creating add to cart div(similar to button, when used button elements button.children or button.childNodes in add eventlisteners
  // return null)
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


let yolo = 2;
window.onload = function() {
  // using this code to add hover effect to .add-to-cart (instead of using css), so that it can be easily removed later
  document.querySelectorAll(".add-to-cart").forEach(el => el.classList.add("add-to-cart-hover"))

  // a function that contains all eventlisteners
  eventListenerFunc(yolo);
}



function eventListenerFunc(yolo) {
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
}


function iconDecrementChanger(decrement) {
  let addToCartText = decrement.nextSibling
  let temp = parseInt(addToCartText.innerHTML, 10)
  temp -= 1
  addToCartText.innerHTML = temp    

  if (addToCartText.innerHTML == 0) {
    // reverts .add-to-cart style and content to its original form    
    const addToCart = decrement.parentElement
    addToCartRevert(addToCart)
  }
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
}



  // // creating icon add to cart
  // const iconAddToCart = document.createElement("div");
  // iconAddToCart.classList.add("icon-add-to-cart");
  // iconAddToCart.id = `icon-add-to-cart${i}`;
  // addToCart.appendChild(iconAddToCart);

  // // creating icon decrement quantity
  // const iconDecrementQuantity = document.createElement("div");
  // iconDecrementQuantity.classList.add("icon-decrement-quantity");
  // iconDecrementQuantity.id = `icon-decrement-quantity${i}`;
  // addToCart.appendChild(iconDecrementQuantity);

  // // creating add to cart p element
  // const addToCartText = document.createElement("div");
  // addToCartText.classList.add("add-to-cart-text");
  // addToCartText.id = `add-to-cart-text${i}`;
  // addToCartText.innerHTML = "Add to Cart"
  // addToCart.appendChild(addToCartText);


// let wholeQuantityz = document.getElementById("quantity-whole")
// // let addToCartText = parseInt(addToCart.querySelector(".add-to-cart-text").innerHTML, 10)
// wholeQuantityz.innerHTML = 2222


/*  style change
*/


    // by clicking .add-to-cart, .add-to-cart-clicked gets added to .add-to-cart, display of .icon-add-to-cart changes to none
    // display of .icon-increment-quantity and .icon-increment-quantity change to block, .add-to-cart-text-clicked gets added to .add-to-cart-text
    // if howmany = 0, add-to-cart clickable styles get added
    // if howmany > 0, only increment and decrement clickable
      // if increment clicked only the how many gets added, styles are already added
      // if decrement clicked
        // if howmany > 1, howmany updates
        // if howmany = 1, howmany converts to "add to cart" and styles get omitted



/*
if howmany = 0
  eventlistener for addtocart
    when clicked => add styles increase howmany

if howmany = 1
  eventlistener for increment
    increase howmany display it
  eventlistener for decrement
    decrease howmany revert styles
  
if howMany > 1
  eventlistener for increment
    increase howmany, display howmany
  eventlistener for decrement
    decrease howmany and display it  



window.onload = function() {
  let howMany = 0;
  add-to-cart => clicked:
    if howmany = 0
      add new styles, display howmany
    if howmany > 0
      do nothing

  increment => clicked:
    update howmany, still gets displayed
  
  decrement => clicked:
    if howMany > 1
      update howmany, still gets displayed
    if howMany = 1
      update howmany, revert styles

}
*/
// document.querySelectorAll(".add-to-cart").forEach(el => el.addEventListener("click", function() {
//   howMany += 1;
//   el.previousElementSibling.classList.add("img-clicked");
//   // console.log(el)
//   el.classList.add("add-to-cart-clicked")
//   el.querySelector(".icon-add-to-cart").style.display = "none"
//   el.querySelector(".icon-increment-quantity").style.display = "block"
//   el.querySelector(".icon-decrement-quantity").style.display = "block"
//   el.querySelector(".add-to-cart-text").classList.add("add-to-cart-text-clicked")
//   el.querySelector(".add-to-cart-text").innerHTML = howMany;
// }))


/*
        document.querySelector('.container').addEventListener('click', function(event) {
            if (event.target.classList.contains('parent')) {
                var child = event.target.querySelector('.child');
                if (child) {
                    child.style.display = 'block';
                }
            }
        });
*/


// window.onload = () => {
//   document.querySelector('.add-to-cart').addEventListener('click', function(event) {
//     // event.target.querySelector(".icon-add-to-cart").style.display = "none";
//     console.log(event)
//   })
// }

/*
// ------------------------------------------------------------------------------------------------------------------
// let clickedStates = {"img": false, "add-to-cart": false, "icon-incremenet": false, "icon-decremenet": false}
let clickCount = 0;

// images or addtocart when clicked => add box-shadow to image and changes in addtocart
window.onload = () => {
  // document.querySelectorAll(".img").forEach(img => 
  //   img.addEventListener("click", function(event) {imgAddToCartClicked(event, clickCount)}))

  document.querySelectorAll(".add-to-cart").forEach(addToCart => 
    addToCart.addEventListener("click", function(event) {imgAddToCartClicked(event, clickCount)}))

  // document.querySelectorAll("icon-decrement-quantity").forEach(decrement =>
  //   decrement.addEventListener("click", bo)
  // )

  // document.querySelectorAll("icon-decrement-quantity").forEach(decrement =>
  //   decrement.addEventListener("click", bo)
  // )
}

function imgAddToCartClicked(event, clickCount) {
  clickCount += 1;

  // if < 1 => no effect (if already have effects => omit effects)
  // if = 1 => add effect & update clickcount
  // if > 1 => maintain effects & update clickcount

  // let img;
  // let button;
  // if (event.currentTarget.tagName == "IMG") {
  //   img = event.currentTarget
  //   button = img.nextElementSibling
  // } else if (event.currentTarget.tagName == "BUTTON") {
  //   button = event.currentTarget
  //   img = button.previousElementSibling
  // }
  // img.classList.add("img-clicked")
  // button.classList.add("add-to-cart-clicked")
  // button.innerHTML = ""
  // console.log(event)
  // console.log(button)
  // document.querySelectorAll(".icon-increment-quantity").forEach(icon => {icon.style.display = "block"});
  // document.querySelectorAll(".icon-decrement-quantity").forEach(icon => {icon.style.display = "block"});
  // document.querySelectorAll(".icon-add-to-cart").forEach(icon => {icon.style.display = "none"});
  // button.classList.add("add-to-cart-clicked", "icon-decrement-quantity", "icon-increment-quantity")
  // button.innerHTML = clickCount;

}

  // let currentEl = event.currentTarget;
  // if (currentEl.tagName == "IMG") {
  //   let siblingEl = currentEl.nextElementSibling;
  //   currentEl.classList.add("img-clicked")
  //   siblingEl.classList.add("add-to-cart-clicked", "icon-decrement-quantity", "icon-increment-quantity")
  //   siblingEl.innerHTML = ""
  // } else if (currentEl.tagName == "BUTTON") {
  //   let siblingEl = currentEl.previousElementSibling;
  //   currentEl.classList.add("add-to-cart-clicked", "icon-decrement-quantity", "icon-increment-quantity")
  //   currentEl.innerHTML = ""
  //   siblingEl.classList.add("img-clicked")
  // }
*/