import { axios } from 'axios';
const URL = "http://localhost:3000";

const productosDiv = document.getElementById("productos");

window.mostrarProductos = async function mostrarProductos(){
    try {
        const response = await get(`${URL}/products`);
        const products = response.data.items;
        productosDiv.innerHTMl = '';
        products.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>`;
            productosDiv.appendChild(productoDiv);
    });
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}