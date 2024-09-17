"use strict";

// 1
let jsonData = null;
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    jsonData = data
    manager(jsonData)
  })
  .catch(error => console.error('Error fetching data:', error));

// 2
window.addEventListener("resize", function() {
  manager(jsonData, true)
})

// 3
// manages functions such as screen width detection, data exctraction, element creation, page interactivity
function manager(jsonData, resize=false) {
  let screenType = detectScreenType()
  extractData(jsonData, screenType, resize)
};

// 4
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

// 5
// 1. initial: resize false. need to check screenwidth load text and images
// 2. page resized: resize true. if new screentype, load new images
function extractData(jsonData, screenType, resize) {
  if (!resize) {
    for (let i=0; i < jsonData.length; i++) {
      const dataImg = jsonData[i].image[`${screenType}`];
      const dataCategory = jsonData[i].category;
      const dataName = jsonData[i].name;
      const dataPrice = jsonData[i].price;

      createElement(i, dataImg, dataCategory, dataName, dataPrice)
    }
  } else if (resize) {
    screenType = detectScreenType()
    for (let i=0; i < jsonData.length; i++) {
      const dataImg = jsonData[i].image[`${screenType}`];
      loadNewImg(i, dataImg)
    }
  }
}

// 6
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

function loadNewImg(i, dataImg) {
  const img = document.getElementById(`img${i}`)
  img.src = dataImg;
  img.alt = dataImg;
}

// ----------------------------------------------------------------------------------

// extracting and creating text elements are done separately from image data, as due to screen resize, image data need change as well

// fetching data.json. contains images urls, categories, names and prices
// fetch("data.json")
//   .then(response => response.json()).then(data => extractData(data)).catch(error => console.error('Error fetching data:', error));

// // extracting text data from data.json
// function extractTextData(data) {
//   for (let i=0; i < data.length; i++) {
        // const dataImgThumbnail = data[i].image.thumbnail;
        // const dataImgMobile = data[i].image.mobile;
        // const dataImgTablet = data[i].image.tablet;
        // const dataImgDesktop = data[i].image.desktop;
//     const dataCategory = data[i].category;
//     const dataName = data[i].name;
//     const dataPrice = data[i].price;

//     // create element using the extracted elements
//     createElement(i, dataCategory, dataName, dataPrice)
//   };
// };


  // for (let i=0; i < data.length; i++) {
  //   const dataImgThumbnail = data[i].image.thumbnail;
  //   const dataImgMobile = data[i].image.mobile;
  //   const dataImgTablet = data[i].image.tablet;
  //   const dataImgDesktop = data[i].image.desktop;
  //   const dataCategory = data[i].category;
  //   const dataName = data[i].name;
  //   const dataPrice = data[i].price;
  // }



/*
extract data
create divs, buttons, texts
get screen width
set screen type
load images
if screen resize
if change in screen type load new images
*/

/*

*/



// // determining screen type based on window.innerWidth
// function screenTypeDetector() {
//   const screenWidth = window.innerWidth;
//   if (screenWidth < 650) {
//     return "mobile"
//   } else if (screenWidth >= 650 && screenWidth < 1024) {
//     return "tablet"
//   } else if (screenWidth >= 1024) {
//     return "desktop"
//   };
// };

// // let screenType = screenTypeDetector();
// // // in case the screen is resized, screen type gets updated
// // screenType = window.addEventListener("resize", screenTypeDetector);

// // fetching data.json. contains images urls, categories, names and prices
// fetch("data.json")
//   .then(response => response.json()).then(data => extractData(data)).catch(error => console.error('Error fetching data:', error));

// // extracting data from data.json
// function extractData(data) {
//   for (let i=0; i < data.length; i++) {
//     const dataImgThumbnail = data[i].image.thumbnail;
//     const dataImgMobile = data[i].image.mobile;
//     const dataImgTablet = data[i].image.tablet;
//     const dataImgDesktop = data[i].image.desktop;
//     const dataCategory = data[i].category;
//     const dataName = data[i].name;
//     const dataPrice = data[i].price;

//     // create element using the extracted elements
//     createElement(i, dataImgThumbnail, dataImgMobile, dataImgTablet, dataImgDesktop, dataCategory, dataName, dataPrice)
//   };
// };

// // creates elements of #items, contains image of dessert(thumbnail, mobile, tablet and desktop),
// // add to cart button, category, name and price
// function createElement(i, dataImgThumbnail, dataImgMobile, dataImgTablet, dataImgDesktop, dataCategory, dataName, dataPrice) {  
//   let screen = screenTypeDetector();
//   alert(screen)
//   let screenOb = {
//     "mobile": dataImgMobile,
//     "tablet": dataImgTablet,
//     "desktop": dataImgDesktop
//   };
//   let dataImg = screenOb[screen];

//   screen = screenOb[screen]
//   // items contains item - each item is a dessert
//   const items = document.getElementById("items")
//   const item = document.createElement("item");
//   item.id = `item${i}`;
//   items.appendChild(item);

//   // I have not understood its use case yet
//   if (1==0) {
//     // create thumbnail images
//     const imgThumbnail = document.createElement("img");
//     imgThumbnail.id = `img-thumbnail${i}`;
//     imgThumbnail.src = dataImgThumbnail;
//     imgThumbnail.alt = dataImgThumbnail;
//     item.appendChild(imgThumbnail);  
//   }

//   // create images
//   const img = document.createElement("img");
//   img.classList.add("img");
//   img.id = `img${i}`;
//   img.src = dataImg;
//   img.alt = dataImg;
//   item.appendChild(img);

//   // creating add to cart button
//   const addToCart = document.createElement("button");
//   // addToCart.addEventListener("click" => )
//   addToCart.innerHTML = "Add to Cart";
//   addToCart.classList.add("add-to-cart");
//   addToCart.id = `add-to-cart${i}`;
//   item.appendChild(addToCart);

//   // creating category element
//   const category = document.createElement("p");
//   category.innerHTML = dataCategory;
//   category.classList.add("category")
//   category.id = `category${i}`;
//   item.appendChild(category);

//   // creating name element
//   const name = document.createElement("p");
//   name.innerHTML = dataName;
//   name.id = `name${i}`;
//   name.classList.add("name");
//   item.appendChild(name);

//   // creating price element
//   const price = document.createElement("p");
//   price.innerHTML = "$" + dataPrice;
//   price.id = `price${i}`;
//   price.classList.add("price");
//   item.appendChild(price);
// }

// screenType = window.addEventListener("resize", extractData);


// adding click event to img
// document.querySelectorAll(".img").forEach(img =>
//   img.addEventListener("click", img.classList.add(".img-clicked"))
// )

// document.querySelectorAll(".img").forEach(img =>
//   alert(img)
// )

// ---------------------------------------------------------------------------------------------------------------------------