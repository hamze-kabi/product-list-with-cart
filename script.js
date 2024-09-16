"use strict";

// fetching data.json. contains images urls, categories, names and prices
fetch("data.json")
  .then(response => response.json()).then(data => extractData(data)).catch(error => console.error('Error fetching data:', error));

// extracting data from data.json
function extractData(data) {
  for (let i=0; i < data.length; i++) {
    const dataImgThumbnail = data[i].image.thumbnail;
    const dataImgMobile = data[i].image.mobile;
    const dataImgTablet = data[i].image.tablet;
    const dataImgDesktop = data[i].image.desktop;
    const dataCategory = data[i].category;
    const dataName = data[i].name;
    const dataPrice = data[i].price;

    // create element using the extracted elements
    createElement(i, dataImgThumbnail, dataImgMobile, dataImgTablet, dataImgDesktop, dataCategory, dataName, dataPrice)
  };
};

// creates elements of #items, contains image of dessert(thumbnail, mobile, tablet and desktop),
// add to cart button, category, name and price
function createElement(i, dataImgThumbnail, dataImgMobile, dataImgTablet, dataImgDesktop, dataCategory, dataName, dataPrice) {  
  let screen = "mobile";
  let screenOb = {
    "mobile": dataImgMobile,
    "tablet": dataImgTablet,
    "desktop": dataImgDesktop
  };
  let dataImg = screenOb[screen];

  screen = screenOb[screen]
  // items contains item - each item is a dessert
  const items = document.getElementById("items")
  const item = document.createElement("item");
  item.id = `item${i}`;
  items.appendChild(item);

  // I have not understood its use case yet
  if (1==0) {
    // create thumbnail images
    const imgThumbnail = document.createElement("img");
    imgThumbnail.id = `img-thumbnail${i}`;
    imgThumbnail.src = dataImgThumbnail;
    imgThumbnail.alt = dataImgThumbnail;
    item.appendChild(imgThumbnail);  
  }

  // create images
  const img = document.createElement("img");
  img.classList.add("img");
  img.id = `img${i}`;
  img.src = dataImg;
  img.alt = dataImg;
  item.appendChild(img);

  // creating add to cart button
  const addToCart = document.createElement("button");
  // addToCart.addEventListener("click" => )
  addToCart.innerHTML = "Add to Cart";
  addToCart.classList.add("add-to-cart");
  addToCart.id = `add-to-cart${i}`;
  item.appendChild(addToCart);

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
