const soapCarts = document.querySelectorAll('.addCartSoap');
const oilCarts = document.querySelectorAll('.addCartOil');
const balmCarts = document.querySelectorAll('.addCartBalm');

let soapProducts = [
    {
        name: 'French Lavender Soap',
        tag: 'frenchlavendersoap',
        price: 8,
        inCart: 0
    },

    {
        name: 'Butt Naked Soap',
        tag: 'buttnakedsoap',
        price: 8,
        inCart: 0
    },
    {
        name: "Odin's Armpit Soap",
        tag: "odinsarmpitsoap",
        price: 8,
        inCart: 0
    }
];

let oilProducts = [
    {
        name: 'Honey Whiskey Beard Oil',
        tag: 'honeywhiskeybeardoil',
        price: 15,
        inCart: 0
    },

    {
        name: 'Sinfully Vanilla Beard Oil',
        tag: 'sinfullyvanillabeardoil',
        price: 15,
        inCart: 0
    },
    {
        name: "Odin's Armpit Beard Oil",
        tag: "odinsarmpitebeardoil",
        price: 15,
        inCart: 0
    }
];
let balmProducts = [
    {
        name: 'Honey Whiskey Beard Balm',
        tag: 'honeywhiskeybeardbalm',
        price: 15,
        inCart: 0
    },

    {
        name: 'Sinfully Vanilla Beard Balm',
        tag: 'sinfullyvanillabeardbalm',
        price: 15,
        inCart: 0
    },
    {
        name: "Odin's Armpit Beard Balm",
        tag: "odinsarmpitbeardbalm",
        price: 15,
        inCart: 0
    },

]

for (let i = 0; i < soapCarts.length; i++) {
    soapCarts[i].addEventListener('click', () => {
        cartNumbers(soapProducts[i]);
        totalCost(soapProducts[i]);
    });
}

for (let i = 0; i < oilCarts.length; i++) {
    oilCarts[i].addEventListener('click', () => {
        cartNumbers(oilProducts[i]);
        totalCost(oilProducts[i]);
    });
}

for (let i = 0; i < balmCarts.length; i++) {
    balmCarts[i].addEventListener('click', () => {
        cartNumbers(balmProducts[i]);
        totalCost(balmProducts[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (action == 'decrease') {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;

    } else if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
    
}

function totalCost(product, action) {
    let cartCost = localStorage.getItem("totalCost");

    
    console.log(typeof cartCost);

if (action == 'decrease') {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", (Math.round(cartCost - product.price)*100) /100)

}else if (cartCost != null) {
        cartCost = parseFloat(cartCost);
        localStorage.setItem("totalCost", (Math.round((cartCost + product.price) * 100) / 100));
    } else {
        localStorage.setItem("totalCost", (Math.round(product.price * 100) / 100));
    }

   
}
const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});



function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="row">
            <div class="product col-6 d-flex align-items-center">
                <svg class="delbutt" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                <img src="./assets/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            
            <div class="price col-2 d-flex align-items-center">$${formatter.format(item.price)}</div>
            <div class="quantity col-2 d-flex align-items-center">
                <svg class="decreaseButt" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z"></path></svg>            
                <span>${item.inCart}</span>
                <svg class="increaseButt" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z"></path></svg>
            </div>
            <div class="total col-2 d-flex align-items-center">
                $${formatter.format(item.inCart * item.price)}
            </div>
            </div>
             `;
        });

        productContainer.innerHTML += `
        <div class="d-flex flex-row-reverse">
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle"> Basket Total
        </h4>
        <h4 class="basketTotal">
        $${formatter.format(cartCost)}
        </h4>
        </div>
        </div>
        `;
    }

    deleteButtons();
    manageQuantity();

}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.delbutt');
    let productName;
    let productNumbers = localStorage.getItem("cartNumbers");
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem("totalCost");


    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');
            localStorage.setItem("cartNumbers", productNumbers - cartItems[productName].inCart);
            localStorage.setItem("totalCost", cartCost - (cartItems[productName].price * cartItems[productName].inCart));
            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
            onLoadCartNumbers();
        });
    }

}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decreaseButt');
    let increaseButtons = document.querySelectorAll('.increaseButt');
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let currentQuantity = 0;
    let currentProduct = "";
    console.log(cartItems)


    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.trim().toLowerCase().replace(/ /g, '').replace(/'/g, '');
            console.log(currentProduct);

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], 'decrease');
                totalCost(cartItems[currentProduct], 'decrease')
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }

        });
    }

    for (let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.trim().toLowerCase().replace(/ /g, '');
                        
            
                cartItems[currentProduct].inCart += 1;
                cartNumbers(cartItems[currentProduct]);
                totalCost(cartItems[currentProduct],)
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            

        })
    }

}


onLoadCartNumbers();
displayCart();