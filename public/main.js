//Traer datis
function traerDatos(){
    return juegos
}
//Manejar datos
function ManejarDatos(){
    return traerDatos()
}


//Agregar Datos a items
AgregarItems();
function AgregarItems() {
    let datos = ManejarDatos()
    const itemsContenedor = document.querySelector('.items')
    for (let i = 0; i < datos.length; i++) {
        const items = document.createElement('div')
        
        let agregarItem =
            `<div class="col-sm-11 col-11 col-md-11">
        <div class="item shadow mb-4">
            <h3 class="item-title">${juegos[i].titulo}</h3>
            <img class="item-image" src=${juegos[i].imagen}>
    
            <div class ="item-details">
            <h4 class ="item-price">$${juegos[i].precio}</h4>
            <button class ="item-button btn btn-primary addToCart">AÑADIR AL CARRITO</button>
            </div>
        </div>`
        items.innerHTML = agregarItem
        itemsContenedor.append(items)
    }
}

//Agregar items a carrito de compras
const botonesAddToCart = document.querySelectorAll('.addToCart');
const modalContenedor = document.querySelector('.modal-body')

//Esperrar click boton agregar al carrito a cada uno de los item
botonesAddToCart.forEach(botonAddToCart => {
    botonAddToCart.addEventListener('click', AñadirConClick)
});

const botonComprar = document.querySelector('.limpiar').addEventListener('click', limpiar)

function AñadirConClick(event) {
    const boton = event.target;
    const item = boton.closest('.item')
    const titulo = item.querySelector('.item-title').textContent;
    const precio = item.querySelector('.item-price').textContent;
    const imagen = item.querySelector('.item-image').src;
    AñadirAlCarrito(titulo, precio, imagen)
}

function AñadirAlCarrito(titulo, precio, imagen) {
    //No duplicar valores
    
    const elementoTitulo = modalContenedor.getElementsByClassName('shopTitulo');
    for (let i = 0; i < elementoTitulo.length; i++) {
        if (elementoTitulo[i].innerText == titulo) {
            let elementoCantidad = elementoTitulo[i].parentElement.parentElement.parentElement.querySelector('.shopCantidad')
            elementoCantidad.value++
            ActualizarTotal();
            return
        }
    }
    
   

    //agregar items a carrito de compras
    const Compras = document.createElement('div')
    const ContenidoCompras =
        `<div class="row shopItems">
            <div class="col-6">
                <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <img src='${imagen}' class="shopImage">
                    <h6 class="shopTitulo text-truncate ">${titulo}</h6>
                </div>
            </div>
            <div class="col-2">
                <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="item-price mb-0 shopPrecio">${precio}</p>
                </div>
            </div>
            <div class="col-4">
                <div
                    class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                    <input class="inputCantidad shopCantidad" type="number"
                        value="1">
                    <button class="btn btn-danger buttonDelete" type="button">X</button>
                </div>
            </div>
        </div>`;

    Compras.innerHTML = ContenidoCompras
    modalContenedor.append(Compras)

    Compras.querySelector('.buttonDelete').addEventListener('click', borrarItem)
    Compras.querySelector('.shopCantidad').addEventListener('change', CambiarshopCantidad)

    ActualizarTotal();
    
    hoverCarrito()
}

//ACTUALIZAR TOTAL
function ActualizarTotal() {
    let total = 0;
    const ObtenerTotal = document.querySelector('.total')
    const ShoppingItems = document.querySelectorAll('.shopItems')
    ShoppingItems.forEach(ShoppingItem => {
        const ShoppingItemPrecio = ShoppingItem.querySelector('.shopPrecio');
        const PrecioParceado = Number(ShoppingItemPrecio.textContent.replace('$', ''));
        const CantidadItems = ShoppingItem.querySelector('.shopCantidad')
        const CantidadItemsValor = Number(CantidadItems.value)
        total = total + PrecioParceado * CantidadItemsValor
    })
    ObtenerTotal.innerHTML = `$${total.toFixed(2)}`;
}

//BORRAR ITEM
function borrarItem(event) {
    const botonBorrar = event.target;
    botonBorrar.closest('.shopItems').remove();
    ActualizarTotal();
    volverHoverCarrito()
}

//CAMABIAR CANTIDAD DE ITEMS
function CambiarshopCantidad(event) {
    const input = event.target
    if (input.value <= 0) {
        input.value = 1;
    }
    ActualizarTotal();
}

 //Limpiar items
function limpiar() {
    modalContenedor.innerHTML = ''
    ActualizarTotal();
    volverHoverCarrito()
    
}

//Hover Carrito al tener un item
function hoverCarrito(){
    if(modalContenedor != undefined ){
        
        let  botonCarrito = document.querySelector('.comprarButton')
        botonCarrito.innerHTML = '¡Items en el carrito!  <i class="fas fa-shopping-cart"></i>'
        botonCarrito.style.color = '#f21b3f'
    }
}
// Quitar Hover carrito al limpiar
function volverHoverCarrito (){
    let  botonCarrito = document.querySelector('.comprarButton')
        botonCarrito.innerHTML = '<i class="fas fa-shopping-cart"></i>'
        botonCarrito.style.color = 'black'
}



