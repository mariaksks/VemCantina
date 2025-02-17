let contadorPedidos = 1;
let pedidos = [];

function criarPedido(nomeUsuario) {
    const pedido = {
        numero: contadorPedidos++,
        nome: nomeUsuario,
        status: "Em andamento"
    };
    pedidos.push(pedido);
    return pedido;
}

function listarPedidos() {
    return pedidos;
}

module.exports = { criarPedido, listarPedidos };