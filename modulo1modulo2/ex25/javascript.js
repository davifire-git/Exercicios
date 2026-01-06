function adicionarProduto() {
    const id = Date.now();

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
            <input type="radio" name="promo_${id}" value="sim" checked> Sim
        </label>
        <label>
            <input type="radio" name="promo_${id}" value="nao"> Não
        </label>

        <p>O produto terá parcelamento?</p>
        <label>
            <input type="radio" name="parcela_${id}" value="sim" checked> Sim
        </label>
        <label>
            <input type="radio" name="parcela_${id}" value="nao"> Não
        </label>
        <br>
        <br>
        <hr>
        <br>
    `;

    document.getElementById("produtos").appendChild(div);
}

    function gerarTexto() {
    const produtos = document.querySelectorAll(".produto");
    let textoFinal = "";

    produtos.forEach(produto => {
        const inputs = produto.querySelectorAll("input");
        const radiosPromo = produto.querySelectorAll("input[name^='promo_']");
        const radiosParcela = produto.querySelectorAll("input[name^='parcela_']");

        const nome = inputs[0].value;
        const de = inputs[1].value;
        const por = inputs[2].value;
        const parcela = inputs[3].value;
        const link = inputs[4].value;

        let temPromocao = "nao";
        radiosPromo.forEach(radio => {
            if (radio.checked) temPromocao = radio.value;
        });

        let temParcelamento = "nao";
        radiosParcela.forEach(radio => {
            if (radio.checked) temParcelamento = radio.value;
        });

        textoFinal += `${nome}\n\n`;

        if (temPromocao === "sim") {
            textoFinal += `De R$ ${de}
💸Por R$ ${por}
`;
        } else {
            textoFinal += `💰Preço: R$ ${de}
`;
        }

        if (temParcelamento === "sim") {
            textoFinal += `💳Ou ${parcela}
`;
        }

        textoFinal += `
🔗Link para Compra:
${link}

*Valores sujeitos a alteração a qualquer momento

\n\n`;
    });

    document.getElementById("resultado").innerText = textoFinal;
}

// Adiciona um produto automaticamente ao abrir
adicionarProduto();