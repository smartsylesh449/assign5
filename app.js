// Product Data

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=70"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2299,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=70"
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "Fashion",
        price: 1899,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=70"
    },

    {
        id: 4,
        name: "Backpack",
        category: "Fashion",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=70"
    },

    {
        id: 5,
        name: "Coffee Mug",
        category: "Home",
        price: 399,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=500&q=70"
    },

    {
        id: 6,
        name: "Desk Lamp",
        category: "Home",
        price: 799,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=70"
    }

];


// Application State

let cart =
    JSON.parse(localStorage.getItem("shopNestCart")) || [];


// Main container

const app = document.getElementById("app");


// Save Cart

function saveCart() {

    localStorage.setItem(
        "shopNestCart",
        JSON.stringify(cart)
    );

}


// Update cart number

function updateCartCount() {

    document.getElementById("cartCount").textContent =
        cart.length;

}


// Home Page

function showHome() {

    app.innerHTML = `

        <section class="hero">

            <h1>Welcome to ShopNest</h1>

            <p>
                Discover useful products at simple prices.
            </p>

            <a href="#products" class="shop-btn">
                Start Shopping
            </a>

        </section>


        <section class="section-title">

            <h2>Why ShopNest?</h2>

            <p>
                Simple shopping with a clean experience.
            </p>

        </section>

    `;

}


// Product Page

function showProducts() {

    app.innerHTML = `

        <div class="section-title">

            <h2>Our Products</h2>

            <p>Browse our product collection</p>

        </div>


        <div class="search-area">

            <input
                type="text"
                id="searchInput"
                placeholder="Search products..."
            >

            <select id="categoryFilter">

                <option value="all">
                    All Categories
                </option>

                <option value="Electronics">
                    Electronics
                </option>

                <option value="Fashion">
                    Fashion
                </option>

                <option value="Home">
                    Home
                </option>

            </select>

        </div>


        <div
            id="productGrid"
            class="product-grid">
        </div>

    `;


    renderProducts(products);


    // Search

    document
        .getElementById("searchInput")
        .addEventListener("input", filterProducts);


    // Category

    document
        .getElementById("categoryFilter")
        .addEventListener("change", filterProducts);

}


// Display Products

function renderProducts(list) {

    const grid =
        document.getElementById("productGrid");


    if (list.length === 0) {

        grid.innerHTML = `
            <div class="empty">
                No products found.
            </div>
        `;

        return;
    }


    grid.innerHTML = list.map(product => `

        <div class="product">

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    ₹${product.price}
                </p>

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>

        </div>

    `).join("");

}


// Search + Filter

function filterProducts() {

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    const category =
        document
        .getElementById("categoryFilter")
        .value;


    const filtered =
        products.filter(product => {

            const matchName =
                product.name
                .toLowerCase()
                .includes(search);


            const matchCategory =
                category === "all" ||
                product.category === category;


            return matchName && matchCategory;

        });


    renderProducts(filtered);

}


// Add to Cart

function addToCart(id) {

    const product =
        products.find(item => item.id === id);


    cart.push(product);


    saveCart();

    updateCartCount();

    alert(product.name + " added to cart!");

}


// Cart Page

function showCart() {

    if (cart.length === 0) {

        app.innerHTML = `

            <div class="empty">

                <h2>Your Cart is Empty</h2>

                <p>
                    Add some products to continue shopping.
                </p>

            </div>

        `;

        return;
    }


    let total = 0;


    app.innerHTML = `

        <div class="section-title">

            <h2>Shopping Cart</h2>

        </div>

        <div id="cartItems"></div>

        <div
            class="total"
            id="cartTotal">
        </div>

    `;


    const cartItems =
        document.getElementById("cartItems");


    cartItems.innerHTML =
        cart.map((item, index) => {

            total += item.price;

            return `

                <div class="cart-item">

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ${item.category}
                        </p>

                        <strong>
                            ₹${item.price}
                        </strong>

                    </div>


                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${index})">

                        Remove

                    </button>

                </div>

            `;

        }).join("");


    document.getElementById("cartTotal").innerHTML =
        `Total Amount: ₹${total}`;

}


// Remove from Cart

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    showCart();

}


// Client-side Router

function router() {

    const page =
        location.hash.substring(1) || "home";


    if (page === "home") {

        showHome();

    }

    else if (page === "products") {

        showProducts();

    }

    else if (page === "cart") {

        showCart();

    }

    else {

        showHome();

    }

}


// Listen for URL changes

window.addEventListener(
    "hashchange",
    router
);


// Start Application

updateCartCount();

router();