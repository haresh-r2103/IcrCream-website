//add cart
const addCart = document.querySelector('.cart');
//side cart opener
const headerCart = document.querySelector('.cart-head');
//side cart closer
const sideClose = document.querySelector('#close');

const side = document.querySelector('.side');

//side opener
headerCart.addEventListener('click', ()=>{
    side.classList.add("side-active");
})
//side closer
sideClose.addEventListener('click', ()=> {
    side.classList.remove("side-active");
})




document.addEventListener('DOMContentLoaded', loadFood);

function loadFood(){
    loadContent();
}
function loadContent(){ 
    //remove each dish from cart
    const eachCartRem = document.querySelectorAll('.cart-remove');
    eachCartRem.forEach((item)=>{
        item.addEventListener('click', removeItem);
    });

    //Product no of items change
    const not = document.querySelectorAll('.cart-quantity');
    not.forEach((ip)=>{
        ip.addEventListener('change', changeQtyty);
    });

    //add product to side
    const addCart = document.querySelectorAll('.cart-main');
    addCart.forEach((cart)=>{
        cart.addEventListener('click', addItem);
    });


    updateTotal();
}

function removeItem(){
    let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList = itemList.filter(ele =>ele.title != title);
    this.parentElement.remove();
    

    loadContent();
}

function changeQtyty(){
    if(isNaN(this.value) || this.value<1){
        this.value = 1;
    } 
    loadContent();
}



//array to check whether already the item is present or not
let itemList  = [];

function addItem(){
    let foodName = this.parentElement;
    let title = foodName.querySelector('.food-title').innerHTML;
    let price = foodName.querySelector('.food-price').innerHTML;
    let imgSrc = foodName.querySelector('.food-img').src;

    //an object is created to keep the checking
    let productObject = {title, price, imgSrc};


    if(itemList.find((el) => el.title == productObject.title)){
        alert("Product alreay added in the Cart!");
        return
    }
    else{
        itemList.push(productObject); 
    }

    let newProductElement = createProduct(title, price, imgSrc);
    let cartBasket = document.querySelector('.cart-content');
    let element  = document.createElement('div');
    element.innerHTML = newProductElement;
    cartBasket.append(element);
    loadContent();
}


function createProduct(title, price, imgSrc) {
    return `
    <div class="cart-box">
        <img src="${imgSrc}"  class="cart-img" >
        <div class="detail-box">
            <div class="cart-food-title">${title}</div>
                <div class="price-box">
                    <div class="cart-price">${price}</div>
                    <div class="cart-amt">${price}</div>
            </div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <ion-icon name="trash-outline" class="cart-remove"></ion-icon>
    </div>`




}

function updateTotal(){
    const cartItem = document.querySelectorAll(".cart-box");
    const totVal = document.querySelector(".total-price");
    let tot = 0;
    cartItem.forEach(prod => {
        let eachPrice = prod.querySelector(".cart-price");
        let price = parseFloat(eachPrice.innerHTML.replace("Rs.",""));
        let qty = prod.querySelector('.cart-quantity').value;
        tot += (price*qty);
        prod.querySelector('.cart-amt').innerText = "Rs."+ (price*qty);

        totVal.innerHTML = "Rs."+tot;

       
    })


    //Add product count
    const cartCount = document.querySelector(".cart-count");
    let c = itemList.length;
    cartCount.innerHTML = c;


    if(c==0){
        cartCount.style.display = 'none';
    }
    else{
        cartCount.style.display = 'block';
    }
}