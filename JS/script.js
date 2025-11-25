let inventario = [];

function agregarProducto() {
    const nombre = document.getElementById("nombre").value.trim();
    const cantidad = document.getElementById("cantidad").value;
    const precio = document.getElementById("precio").value;

    if (!nombre || !cantidad || !precio) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (cantidad < 0 || precio < 0) {
        alert("La cantidad y el precio deben ser valores positivos");
        return;
    }

    const producto = {
        id: Date.now(),
        nombre: nombre,
        cantidad: parseInt(cantidad),
        precio: parseFloat(precio)
    };

    inventario.push(producto);
    mostrarProductos();

    document.getElementById("nombre").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";

    mostrarMensaje('Producto agregado correctamente');
}

function mostrarProductos() {
    const lista = document.getElementById("productList");
    
    if (inventario.length === 0) {
        lista.innerHTML = `
            <div class="empty-message">
                <p>No hay productos en el inventario</p>
                <p>Agrega tu primer producto usando el formulario</p>
            </div>
        `;
        return;
    }

    lista.innerHTML = inventario.map(producto => `
        <div class="product-item" data-id="${producto.id}">
            <div class="product-info">
                <div class="product-name">${producto.nombre}</div>
                <div class="product-details">
                    <span>Cantidad: ${producto.cantidad}</span>
                    <span>Precio: $${producto.precio.toFixed(2)}</span>
                    <span>Total: $${(producto.cantidad * producto.precio).toFixed(2)}</span>
                </div>
            </div>
            <div class="product-actions">
                <button class="btn-editar" onclick="editarProducto(${producto.id})">
                    Editar
                </button>
                <button class="btn-eliminar" onclick="eliminarProducto(${producto.id})">
                    Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

function eliminarProducto(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        return;
    }

    inventario = inventario.filter(p => p.id !== id);
    mostrarProductos();
    mostrarMensaje('Producto eliminado correctamente');
}

function editarProducto(id) {
    const producto = inventario.find(p => p.id === id);
    
    if (!producto) {
        alert("Producto no encontrado");
        return;
    }

    const nuevoNombre = prompt("Nuevo nombre del producto:", producto.nombre);
    if (nuevoNombre === null) return;

    const nuevaCantidad = prompt("Nueva cantidad:", producto.cantidad);
    if (nuevaCantidad === null) return;

    const nuevoPrecio = prompt("Nuevo precio:", producto.precio);
    if (nuevoPrecio === null) return;

    if (!nuevoNombre.trim() || !nuevaCantidad || !nuevoPrecio) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (nuevaCantidad < 0 || nuevoPrecio < 0) {
        alert("La cantidad y el precio deben ser valores positivos");
        return;
    }

    inventario = inventario.map(p =>
        p.id === id
            ? {
                ...p,
                nombre: nuevoNombre.trim(),
                cantidad: parseInt(nuevaCantidad),
                precio: parseFloat(nuevoPrecio)
            }
            : p
    );

    mostrarProductos();
    mostrarMensaje('Producto actualizado correctamente');
}

function mostrarMensaje(mensaje) {
    const mensajeElement = document.createElement('div');
    mensajeElement.textContent = mensaje;
    mensajeElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        background: #4caf50;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(mensajeElement);

    setTimeout(() => {
        mensajeElement.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inventario de Panadería iniciado...");
    mostrarProductos();
   
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarProducto();
        }
    });
});

const estiloMensajes = document.createElement('style');
estiloMensajes.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(estiloMensajes);