function adicionarProduto() {
    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `
        <input placeholder="Nome do produto">
        <input placeholder="Preço original (ex: 199,90)">
        <input placeholder="Preço promocional (ex: 149,90)">
        <input placeholder="Parcelamento (ex: 10x de 14,99)">
        <input placeholder="Link de afiliado">

        <p>O produto terá promoção?</p>
        <label>
            <input type="radio" name="promo_${Date.now()}" value="sim" checked> Sim
        </label>
        <label>
            <input type="radio" name="promo_${Date.now()}" value="nao"> Não
        </label>
    `;
    document.getElementById("produtos").appendChild(div);
    }

    function gerarTexto() {
    const produtos = document.querySelectorAll(".produto");
    let textoFinal = "";

    produtos.forEach(produto => {
        const inputs = produto.querySelectorAll("input");
        const radios = produto.querySelectorAll("input[type='radio']");

        const nome = inputs[0].value;
        const de = inputs[1].value;
        const por = inputs[2].value;
        const parcela = inputs[3].value;
        const link = inputs[4].value;

        let temPromocao = "nao";
        radios.forEach(radio => {
            if (radio.checked) temPromocao = radio.value;
        });

        textoFinal += `${nome}\n\n`;

        if (temPromocao === "sim") {
            textoFinal += `De R$ ${de}
💸Por R$ ${por}
💳Ou ${parcela}

`;
        } else {
            textoFinal += `💰Preço: R$ ${de}
💳Ou ${parcela}

`;
        }

        textoFinal += `🔗Link para Compra:
${link}

*Valores sujeitos a alteração a qualquer momento

\n\n`;
    });

    document.getElementById("resultado").innerText = textoFinal;
}

// Adiciona um produto automaticamente ao abrir
adicionarProduto();