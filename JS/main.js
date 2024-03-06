
let productos = [
    { nombre: "Manzanas", precio: 100 },
    { nombre: "Plátanos", precio: 200 },
    { nombre: "Leche", precio: 500 },
    { nombre: "Pan", precio: 250 },
    { nombre: "Huevos", precio: 600 }
];


function mostrarProductos() {
    let listaProductos = document.getElementById("productos-lista");

    productos.forEach(producto => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${producto.nombre} - Precio: $${producto.precio}</span>
            <input type="number" id="${producto.nombre}" value="0" min="0">
        `;
        listaProductos.appendChild(listItem);
    });
}


function agregarAlCarrito() {
    let carrito = [];
    
    productos.forEach(producto => {
        let cantidad = parseInt(document.getElementById(producto.nombre).value);
        if (cantidad > 0) {
            carrito.push({ nombre: producto.nombre, cantidad, subtotal: cantidad * producto.precio });
        }
    });

    return carrito;
}


function mostrarCarrito() {
    let carrito = agregarAlCarrito();
    let carritoLista = document.getElementById("carrito-lista");
    carritoLista.innerHTML = "";

    carrito.forEach(item => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.subtotal.toFixed(2)}`;
        carritoLista.appendChild(listItem);
    });

    let total = carrito.reduce((acc, item) => acc + item.subtotal, 0);
    let totalItem = document.createElement("li");
    totalItem.textContent = `Total: $${total.toFixed(2)}`;
    carritoLista.appendChild(totalItem);
}


window.onload = function() {
    mostrarProductos();
};
