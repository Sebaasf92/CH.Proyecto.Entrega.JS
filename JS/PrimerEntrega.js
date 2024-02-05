//Creamos una función para el saludo de bienvenida
function saludo(nombre, apellido){
    console.log("Bienvenido, " + nombre + " " + apellido);
}
//Definimos variables y solicitamos info

let nombre = prompt("Indicanos tu nombre: ");
let apellido = prompt("Ahora tu apellido: ");

//llamamos a la función de saludo
saludo(nombre,apellido);

let carrito = 0;
let salir = false;

while(salir==false){
let productos = prompt(
    "Selecciona un producto: \n 1- Agua (uSd 2) \n 2- Café (uSd 1) \n 3- Harina (uSd 3) \n 4- Jabón líquido (uSd 5) \n 0- Salir"
    );

let agua = 2;
let cafe= 1;
let harina= 3;
let jabon= 5;

if(productos == 1){
    console.log("Sumaste 1 agua.");
    carrito=carrito+agua;
}
else{
    if(productos == 2){
        console.log("Sumaste 1 café");
        carrito=carrito+cafe;
    }
    else{
        if(productos == 3){
            console.log("Sumaste 1 harina");
            carrito=carrito+harina;
        }
        else{
            if(productos == 4){
                console.log("Sumaste 1 jabón líquido");
                carrito=carrito+jabon
            }
            else{
                if(productos == 0){

                    console.log("Total a pagar: uSd " + carrito);
                    salir=true;
                }
                else{

                    console.log("Opción inválida. Elegí nuevamente.");
                }
            }
        }
    }
}
}