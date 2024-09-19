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

  // creating add to cart button
  const addToCart = document.createElement("button");
  addToCart.innerHTML = "Add to Cart";
  addToCart.classList.add("add-to-cart");
  addToCart.id = `add-to-cart${i}`;
  item.appendChild(addToCart);

  // creating icon decrement element to serve as border for icon-decrement-quantity.
  // the icon-decrement-quantity border does not function well
  const iconDecrementBorder = document.createElement("div");
  iconDecrementBorder.classList.add("icon-decrement-border");
  iconDecrementBorder.id = `icon-decrement-border${i}`;
  item.appendChild(iconDecrementBorder);

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

// images or addtocart when clicked => add box-shadow to image and changes in addtocart
window.onload = () => {
  document.querySelectorAll(".img").forEach(img => 
  img.addEventListener("click", imgAddToCartClicked))

  document.querySelectorAll(".add-to-cart").forEach(img => 
    img.addEventListener("click", imgAddToCartClicked))
}

function imgAddToCartClicked() {
  let currentEl = this;
  if (currentEl.tagName == "IMG") {
    let siblingEl = this.nextElementSibling;
    currentEl.classList.add("img-clicked")
    siblingEl.classList.add("add-to-cart-clicked", "add-to-cart-clicked-before", "add-to-cart-clicked-after")
    siblingEl.textContent = ""
    // alert(currentEl)
    // alert(siblingEl.children[0])
    // alert(this.nextElementSibling.children[0])
  } else if (this.tagName == "BUTTON") {
    let siblingEl = this.previousElementSibling;
    currentEl.classList.add("add-to-cart-clicked", "add-to-cart-clicked-before", "add-to-cart-clicked-after")
    currentEl.innerHTML = ""
    siblingEl.classList.add("img-clicked")
    alert(currentEl.childNodes[1])
    // currentEl.children.forEach(el => {alert(el)})
    // alert(currentEl.children[0])
    // alert(siblingEl)
    // alert(currentEl.children[0])
  }
}

// ---------------------------------------------------------------------------------------------------------------
// document.querySelectorAll(".img").forEach(img => console.log(img.src))
// adding click event to img
// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll(".img").forEach(img => console.log(img.src))
// });


// document.querySelectorAll(".img").forEach(img => img.addEventListener("click", function() {alert(11)}))
// document.getElementById("img1").addEventListener("click", function() {alert(11)})
