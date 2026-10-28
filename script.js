const periodo = document.getElementById("periodo");
const botao = document.getElementById("formato");

const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");

const hora = document.getElementById("hora");
const regua = document.getElementById("regua");
const dataEl = document.getElementById("data");
const fuso = document.getElementById("fuso");

let formato12 = false;

// Formato da data em português
const formatoData = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

// Identifica o fuso horário local
fuso.textContent = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone
    .replace(/_/g, " ");

// Adiciona zero à esquerda quando necessário
function dois(numero) {
    return String(numero).padStart(2, "0");
}

// Atualiza o relógio, a data e a barra de progresso
function atualizar() {
    const agora = new Date();
    let h = agora.getHours();

    // Conversão para o formato de 12 horas
    if (formato12) {
        periodo.textContent = h < 12 ? "AM" : "PM";
        h = h % 12 || 12;
    }

    periodo.hidden = !formato12;

    // Atualiza os números do relógio
    hh.textContent = dois(h);
    mm.textContent = dois(agora.getMinutes());
    ss.textContent = dois(agora.getSeconds());

    // Atualiza a data
    dataEl.textContent = formatoData.format(agora);

    // Atualiza a barra de progresso dos segundos
    regua.style.transform =
        "scaleX(" + (agora.getSeconds() / 60) + ")";

    // Atualiza o horário no elemento time
    hora.dateTime = agora.toTimeString().slice(0, 8);
}

// Mantém o relógio sincronizado com os segundos
function ciclo() {
    atualizar();

    setTimeout(ciclo, 1000 - (Date.now() % 1000));
}

// Alterna entre os formatos de 12 e 24 horas
botao.addEventListener("click", function () {
    formato12 = !formato12;

    botao.textContent = formato12
        ? "Formato 12 h"
        : "Formato 24 h";

    atualizar();
});

// Inicia o relógio
ciclo();