//Carta
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document .querySelector("#close-cart");
let cartIcon2 = document.querySelector("#cart-icon2");
//abrir
cartIcon.onclick = () => {
cart.classList.add("active")
};
//cerrar
closeCart.onclick = () => {
    cart.classList.remove("active")
};

cartIcon2.onclick = () => {
    cart.classList.add("active")
    };

//Como se trabaja la carta
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded' , ready);
}else{
    ready();
}
//funciones
function ready(){
    // Remover items
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
    var button = removeCartButtons[i];
    button. addEventListener('click' , removeCartItem);
    
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0 ; i <quantityInputs.length;i++){
        var input = quantityInputs[i];  
        input.addEventListener('change',quantityChanged);
    }
    //Agregar a la carta
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0 ; i <addCart.length ; i++){
        var button = addCart[i];
        button.addEventListener('click',addCartClicked);
    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}
//boton comprar
function buyButtonClicked(){
    alert('Su compra esta hecha');
    window.location = "pagos.html";
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartContentHTML = cartContent.outerHTML;

    var totalPrice = document.getElementsByClassName('total-price')[0];
    var totalPriceText = totalPrice.innerHTML;
    
    //guardar los items para mostrarlos en el otro
    localStorage.setItem('cartContentHTML', cartContentHTML);
    localStorage.setItem('totalPriceText', totalPriceText);
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }   
    updatetotal();
    
}

//remover
function removeCartItem(event){
    var buttonClicked = event.target
    Swal.fire({
  title: '¿Deseas Borrar el Producto?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#36AB0E',
  confirmButtonText: 'Eliminar',
  cancelButtonColor: '#d33',
  cancelButtonText: 'Cancelar'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Producto Eliminado',
      '',
      'success',
      buttonClicked.parentElement.remove(),
      updatetotal()
    )
  }
})
    
}

//cambios
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updatetotal();
    
}

//agregar a la carta
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price,productImg);
    updatetotal();
}

function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for(var i = 0 ; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert("Ya esta en tu carrito");
            return;
        }
    }

    var cartBoxContent = `
    <img src = "${productImg}" alt="" class="cart-img" id ="imagen_producto">
<div class="detail-box">
<div class="cart-product-title" id ="titulo_producto">${title}</div>
<div class="cart-price" id ="precio_producto">${price}</div>
<input type="number" value="1" class="cart-quantity" id ="cantidad_producto">
</div>
<i class='bx bxs-trash-alt cart-remove' ></i>`; 

                    cartShopBox.innerHTML = cartBoxContent;
                    cartItems.append(cartShopBox);
                    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
                    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);
                  // Guardar el contenido en el localStorage
        
}
function updatetotal(){
var cartContent = document.getElementsByClassName("cart-content")[0];
var cartBoxes = cartContent.getElementsByClassName("cart-box");
var total = 0;
for (var i = 0;i<cartBoxes.length;i++){
var cartBox = cartBoxes[i];
var priceElement = cartBox.getElementsByClassName("cart-price")[0];
var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
var price  = parseFloat(priceElement.innerText.replace("S/",""));
var quantity = quantityElement.value;
total = total + (price * quantity);
}
// si el precio contiene cientos
total = Math.round(total * 100) / 100;

document.getElementsByClassName('total-price')[0].innerText = 'S/' + total;
//guardar el precio total

}



var dropdownBtn = document.querySelector('.dropdown-btn');

dropdownBtn.addEventListener('click', function() {
  this.classList.toggle('active');
});
var dropdownItems = document.querySelectorAll('.dropdown-list li');
dropdownItems.forEach(function(item) {
    item.addEventListener('click', function() {
      var url = this.getAttribute('data-url');
      window.location.href = url;
    });
  });

function search() {
  // presionar escape y borrar
  
  const input = document.getElementById("buscador");

  input.addEventListener('keyup',debounce(function(event){
    if(event.keyCode === 13){
      busc();
    }
  }))
  
}

function busc(){
    
    const input = document.getElementById("buscador");
    const searchTerm = input.value.toLowerCase();
    const items = document.querySelectorAll(".product-box");
    var noResultsMessage = document.getElementById("no-results");
    let foundMatch = false;
    items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const containsTerm = text.includes(searchTerm);
        if (containsTerm) {
            foundMatch = true;
          item.style.display = "block";
          item.style.width = "250px";
          item.style.heigth = "250px";
          item.style.marginBottom = "20px";
          item.style.borderRadius = "10px";
        } else {

          item.style.display = "none";
        }
      });
      if (!foundMatch) {
        noResultsMessage.innerHTML = "No se encontró el producto";
      } else {
        noResultsMessage.innerHTML = "";
      }
}
function clearInput() {
    document.getElementById("buscador").value = ""; // borra el texto del input
    showAllProducts(); // muestra todos los productos
  }

  var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
