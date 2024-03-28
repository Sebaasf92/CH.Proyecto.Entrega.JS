function mostrarProductos() {
    fetch('./json/productos.json')
        .then(response => response.json())
        .then(data => {
            let listaProductos = document.getElementById("productos-lista");
            listaProductos.innerHTML = "";

            data.productos.forEach((producto) => {
                let listItem = document.createElement("li");
                listItem.innerHTML = `
                    <span>${producto.nombre} - Precio: $${producto.precio}</span>
                    <input class="actualizar-cantidad" type="number" id="${producto.nombre}" value="0" min="0">
                `;
                listaProductos.appendChild(listItem);
            });

            // Hago un evento "change" por cada input de cada producto
            const inputsCantidadCarrito = document.querySelectorAll(".actualizar-cantidad");
            inputsCantidadCarrito.forEach((input) => {
                input.addEventListener("change", (event) => {
                    const productoEnCarrito = carrito.find((producto) => producto.nombre == input.id);

                    if (productoEnCarrito) {
                        productoEnCarrito.cantidad = input.value;
                        productoEnCarrito.subtotal = input.value * productoEnCarrito.precio;

                    } else {
                        const producto = data.productos.find((producto) => producto.nombre == input.id);
                        carrito.push({
                            ...producto,
                            cantidad: input.value,
                            subtotal: input.value * producto.precio,
                        });
                    }

                    mostrarCarrito();
                    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito en localStorage
                });
            });
        })
        .catch(error => console.error('Error fetching productos:', error));
}

// Función para mostrar el carrito
function mostrarCarrito() {
    let carritoLista = document.getElementById("carrito-lista");
    carritoLista.innerHTML = "";

    carrito.forEach((item) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.subtotal.toFixed(2)}`;
        carritoLista.appendChild(listItem);
    });

    let total = carrito.reduce((acc, item) => acc + item.subtotal, 0);
    let totalItem = document.createElement("li");
    totalItem.textContent = `Total: $${total.toFixed(2)}`;
    carritoLista.appendChild(totalItem);
}

window.onload = function () {
    mostrarProductos();

    const btnActualizarCarrito = document.getElementById("btnActualizarCarrito");
    const btnComprar = document.getElementById("btnComprar");
    const btnCancelar = document.getElementById("btnCancelar");
    const carritoContainer = document.getElementById("carrito-container");

    btnActualizarCarrito.addEventListener("click", function () {
        mostrarCarrito();
        carritoContainer.style.display = "flex";
    });

    btnComprar.addEventListener("click", function () {
        if (carrito.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "No hay ningún producto seleccionado.",
            });
            return;
        }

        // Generar mensaje de felicitaciones con los productos comprados
        let mensaje = "Felicitaciones! Compraste los siguientes productos:\n";
        carrito.forEach((producto) => {
            mensaje += `${producto.nombre} - Cantidad: ${producto.cantidad}\n`;
        });

        // Mostrar mensaje de compra satisfactoria
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Tu compra se ha realizado con éxito!",
            showConfirmButton: false,
            timer: 2000
        });

        // Limpiar el carrito y restablecer las selecciones
        carrito.length = 0;
        localStorage.removeItem('carrito'); // Limpiar el carrito del localStorage
        mostrarCarrito();
        const inputsCantidadCarrito = document.querySelectorAll(".actualizar-cantidad");
        inputsCantidadCarrito.forEach((input) => {
            input.value = 0;
        });
        // Ocultar el contenedor del carrito después de comprar
        carritoContainer.style.display = "none";
    });

    // Evento click para cancelar y restablecer el carrito
    btnCancelar.addEventListener("click", function () {
        // Vaciar el arreglo del carrito
        carrito.length = 0;
        localStorage.removeItem('carrito'); // Limpiar el carrito del localStorage
        // Redibujar el carrito vacío
        mostrarCarrito();
        // Restablecer el valor de todos los campos de entrada a 0
        const inputsCantidadCarrito = document.querySelectorAll(".actualizar-cantidad");
        inputsCantidadCarrito.forEach((input) => {
            input.value = 0;
        });
        // Ocultar el contenedor del carrito al cancelar
        carritoContainer.style.display = "none";
    });
};



// Verificar y cargar el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
