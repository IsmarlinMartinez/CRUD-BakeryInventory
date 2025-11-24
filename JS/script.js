let inventario =[];

function agregarProducto(){
    const nombre = document.getElementById('nombre').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;

    if (!nombre || !cantidad || !precio){
        alert("Todos los campos son obligatorios")
        return;
    }

    const product = {
        id: Date.now(),
        nombre,
        cantidad,
        precio
    };

    inventario.push(producto);
    mostrarProductos();
}

function mostrarProductos() {
    const lista = document.getElementById('lista');
    lista.innerHTML = "";

    inventario.forEach(prod => {
        const li = document.createElement('li');

        li.innerHTML = `
            ${prod.nombre} — Cant: ${prod.cantidad} — $${prod.precio}
            <span>
                <button class="action" onclick="editarProducto(${prod.id})">Editar</button>
                <button class="action" onclick="eliminarProducto(${prod.id})">Eliminar</button>
            </span>
        `;

        lista.appendChild(li);
    });
}