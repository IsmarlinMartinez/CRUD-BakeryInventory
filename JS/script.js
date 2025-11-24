let inventario =[];

function agregarProducto(){
    const nombre = document.getElementById('nombre').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;

    if (!nomre || !cantidad || !precio){
        alert("Todos los campos son oblogatorios")
        return;
    }

    const product = {
        id: Date.now(),
        nombre,
        cantidad,
        precio
    };

    inventario.push(producto);
    mostrarProducto();
}
