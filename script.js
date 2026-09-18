/* =========================
   PRODUCT DATA
========================= */

const products = [

    {
        id: 1,
        name: "Smart Watch",
        category: "Electronics",
        price: 2999,
        icon: "⌚"
    },

    {
        id: 2,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1999,
        icon: "🎧"
    },

    {
        id: 3,
        name: "Smartphone",
        category: "Electronics",
        price: 14999,
        icon: "📱"
    },

    {
        id: 4,
        name: "Cotton T-Shirt",
        category: "Fashion",
        price: 799,
        icon: "👕"
    },

    {
        id: 5,
        name: "Sneakers",
        category: "Fashion",
        price: 2499,
        icon: "👟"
    },

    {
        id: 6,
        name: "Backpack",
        category: "Accessories",
        price: 1499,
        icon: "🎒"
    },

    {
        id: 7,
        name: "Sunglasses",
        category: "Accessories",
        price: 999,
        icon: "🕶️"
    },

    {
        id: 8,
        name: "Leather Wallet",
        category: "Accessories",
        price: 699,
        icon: "👛"
    }

];


/* =========================
   CART
========================= */

let cart =
    JSON.parse(
        localStorage.getItem("shopzoneCart")
    ) || [];


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(list) {

    const productList =
        document.getElementById(
            "productList"
        );

    productList.innerHTML = "";


    if (list.length === 0) {

        productList.innerHTML = `
            <p>
                No products found.
            </p>
        `;

        return;
    }


    list.forEach(product => {

        productList.innerHTML += `

            <article class="product-card">

                <div class="product-image">
                    ${product.icon}
                </div>

                <div class="product-info">

                    <small>
                        ${product.category}
                    </small>

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        Quality product for
                        everyday use.
                    </p>

                    <span class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    <button
                        class="add-button"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </article>

        `;

    });

}


/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );


    cart.push(product);


    saveCart();

    updateCart();


    alert(
        product.name +
        " added to cart!"
    );
}


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "shopzoneCart",
        JSON.stringify(cart)
    );

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    document.getElementById(
        "cartCount"
    ).innerText =
        cart.length;


    const cartItems =
        document.getElementById(
            "cartItems"
        );


    const total =
        document.getElementById(
            "total"
        );


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty">
                Your cart is empty.
            </p>
        `;

        total.innerText = "0";

        return;
    }


    cartItems.innerHTML = "";


    let totalPrice = 0;


    cart.forEach(
        (product, index) => {

            totalPrice +=
                product.price;


            cartItems.innerHTML += `

                <div class="cart-item">

                    <span>
                        ${product.icon}
                        ${product.name}
                    </span>

                    <span>
                        ₹${product.price}

                        <button
                            onclick="removeFromCart(${index})"
                        >
                            ✕
                        </button>

                    </span>

                </div>

            `;

        }
    );


    total.innerText =
        totalPrice.toLocaleString("en-IN");

}


/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(index) {

    cart.splice(
        index,
        1
    );


    saveCart();

    updateCart();

}


/* =========================
   OPEN CART
========================= */

function openCart() {

    document
        .getElementById("cart")
        .classList.add("open");

}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("open");

}


/* =========================
   SEARCH
========================= */

function searchProducts() {

    const search =
        document
            .getElementById("searchBox")
            .value
            .toLowerCase();


    const category =
        document
            .getElementById("category")
            .value;


    const result =
        products.filter(product => {

            const nameMatch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const categoryMatch =
                category === "all" ||
                product.category === category;


            return (
                nameMatch &&
                categoryMatch
            );

        });


    displayProducts(result);

}


/* =========================
   CATEGORY FILTER
========================= */

function filterProducts() {

    searchProducts();

}


/* =========================
   CHECKOUT
========================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;
    }


    alert(
        "Order placed successfully! Thank you for shopping."
    );


    cart = [];

    saveCart();

    updateCart();

}


/* =========================
   START
========================= */

displayProducts(products);

updateCart();