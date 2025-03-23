const apiUrl = "https://6sklxj-50000.csb.app/"; 

// Função para buscar pedidos
function buscarPedidos() {
    fetch(`${apiUrl}/pedidos`)
        .then(response => response.json())
        .then(pedidos => {
            const listaPedidos = document.getElementById("listaPedidos");
            listaPedidos.innerHTML = ""; // Limpa a lista antes de adicionar novos pedidos
            pedidos.forEach(pedido => {
                const li = document.createElement("li");
                li.textContent = `${pedido.id} - ${pedido.prato} - ${pedido.horario}`;
                listaPedidos.appendChild(li);
            });
        })
        .catch(error => console.error("Erro ao buscar pedidos:", error));
}

// Função para adicionar um novo pedido
document.getElementById("formPedido").addEventListener("submit", function(event) {
    event.preventDefault();
    const prato = document.getElementById("prato").value;
    
    if (prato) {
        fetch(`${apiUrl}/pedidos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prato })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensagem);
            buscarPedidos(); // Atualiza a lista de pedidos
            document.getElementById("prato").value = ""; // Limpa o campo de entrada
        })
        .catch(error => console.error("Erro ao adicionar pedido:", error));
    }
});

// Função para registrar pagamento
document.getElementById("formPagamento").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const pedidoId = document.getElementById("pedidoId").value;
    const valorPago = document.getElementById("valorPago").value;
    const metodoPagamento = document.getElementById("metodoPagamento").value;

    if (pedidoId && valorPago && metodoPagamento) {
        fetch(`${apiUrl}/pagamento`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pedido_id: pedidoId, valor_pago: valorPago, metodo_pagamento: metodoPagamento })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensagem);
        })
        .catch(error => console.error("Erro ao registrar pagamento:", error));
    }
});

// Carregar pedidos ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    buscarPedidos();
});