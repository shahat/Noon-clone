const categoriesItems = [
  {
    name: "smartphones",
    imageURL: "Phones.jpg",
  },
  {
    name: "laptops",
    imageURL: "laptop.jpg",
  },
  {
    name: "fragrances",
    imageURL: "perfumes.png",
  },
  {
    name: "skincare",
    imageURL: "skinCare.png",
  },
  {
    name: "groceries",
    imageURL: "Grocery.jpg",
  },
  {
    name: "home-decoration",
    imageURL: "home-decoration.jpg",
  },
];

let categories = document.getElementById("categories");
let clickedCategory;
let products = [];
let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

for (let i = 0; i < categoriesItems.length; i++) {
  let createdElement = document.createElement("div");
  let elmentName = document.createElement("span");
  createdElement.setAttribute("class", "category");
  createdElement.setAttribute("id", categoriesItems[i].name);
  createdElement.style.backgroundImage = `url("./assets/images/${categoriesItems[i].imageURL}")`;
  elmentName.setAttribute("class", "categoryName");
  elmentName.innerText = categoriesItems[i].name;
  createdElement.appendChild(elmentName);
  createdElement.addEventListener("click", getCategory);
  categories.appendChild(createdElement);
}

// Get categories from JSON
function getCategory() {
  clickedCategory = this.id;
  fetch("http://localhost:3000/products?category=" + clickedCategory)
    .then((response) => response.json())
    .then((data) => {
      products = [...data];
      createProducts(); // Call createProducts after fetching the data
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Create products
function createProducts() {
  let productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = ""; // Clear previous products before adding new ones
  console.log(products.length);
  if (products && products.length > 0) {
    for (let k = 0; k < products.length; k++) {
      let product = document.createElement("div");
      product.setAttribute("class", "product");
      let customizedProduct = `	<div class="product-card" >
      <div class="product-tumb">
        <img src="${products[k].images[0]}" alt="">
      </div>
      <div class="product-details">   
        <h4><a href="">${products[k].title}</a></h4>
        <p>${products[k].description.slice(1, 30)}</p>
        <div class="product-bottom-details">
          <div class="product-price">${products[k].price} $</div>
          <div class="product-links">
            <span href="#"><i class="fa fa-heart" onClick="addToWishList(this)"></i></span>
            <span ><i id="${
              products[k].id
            }" class="fa fa-shopping-cart" onclick="addToCart(this)"></i></span>
          </div>
        </div>
      </div>
    </div>`;
      product.innerHTML = customizedProduct;
      productsContainer.appendChild(product);
    }
  } else {
    // Handle the case when no products are available for the selected category
    productsContainer.innerHTML = "No products available for this category.";
  }
}
// cart function => when you click on cart button of the product will add this product to the cart array
let pushedproduct;
function addToCart(e) {
  pushedproduct = products.filter((product) => product.id == e.id)[0];
  if (cart.filter((product) => product.id == pushedproduct.id).length == 0)
    cart.push(pushedproduct);
  console.log(pushedproduct.id);
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(JSON.parse(localStorage.getItem("cart")));
}

// addToWishList(this)
// function addToWishList(element){
//   console.log(element.id)
// }

//  search filteration function
function getData() {
  const inputValue = document.getElementById("search").value;
  fetch(`http://localhost:3000/products`)
    .then((response) => response.json())
    .then((data) => {
      const productsData = [...data];
      products = productsData.filter((product) => {
        return product.title.toLowerCase().includes(inputValue.toLowerCase());
      });
      createProducts();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// onload display all products
function displayProducts() {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      products = [...data];
      createProducts();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

//// Products slider

var ourimages = [];
ourimages[0] = "./assets/images/sliderImages/1.png";
ourimages[1] = "./assets/images/sliderImages/2.gif";
ourimages[2] = "./assets/images/sliderImages/3.jpg";
ourimages[3] = "./assets/images/sliderImages/4.png";
ourimages[4] = "./assets/images/sliderImages/5.png";
ourimages[5] = "./assets/images/sliderImages/6.png";
ourimages[6] = "./assets/images/sliderImages/7.png";
ourimages[7] = "./assets/images/sliderImages/8.png";
ourimages[8] = "./assets/images/sliderImages/9.png";
ourimages[9] = "./assets/images/sliderImages/10.png";
ourimages[10] = "./assets/images/sliderImages/11.png";
ourimages[11] = "./assets/images/sliderImages/12.png";
ourimages[12] = "./assets/images/sliderImages/13.png";
var counter = -1;
var y;
function autoPlay() {
  y = setInterval(function () {
    counter++;
    if (counter < ourimages.length) {
      document.getElementById("slid-img").src = ourimages[counter];
    } else {
      counter = -1;
    }
  }, 3000);
}

document.getElementById("next2").addEventListener("click", function () {
  counter++;
  if (counter < ourimages.length) {
    document.getElementById("slid-img").src = ourimages[counter];
  } else {
    counter = -1;
  }
  clearInterval(y);
});
document.getElementById("prev2").addEventListener("click", function () {
  counter--;
  if (counter > -1) {
    document.getElementById("slid-img").src = ourimages[counter];
  } else {
    counter = 12;
  }
  clearInterval(y);
});

document.getElementById("next").addEventListener("mouseover", function () {
  document.getElementById("next2").style.display = "block";
  document.getElementById("next").style.display = "none";
});
document.getElementById("slid-img").addEventListener("mouseover", function () {
  document.getElementById("next").style.display = "block";
  document.getElementById("next2").style.display = "none";
});
document.getElementById("prev").addEventListener("mouseover", function () {
  document.getElementById("prev2").style.display = "block";
  document.getElementById("prev").style.display = "none";
});
document.getElementById("slid-img").addEventListener("mouseover", function () {
  document.getElementById("prev").style.display = "block";
  document.getElementById("prev2").style.display = "none";
});
