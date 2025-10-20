const potencias = {
  maquina: 350, //watts
  ferro: 1000, //watts
  chuveiro: 3500, //watts
};

function calcularConsumo() {
  //pega os valores dos inputs
  const minutosChuveiro =
    parseFloat(document.getElementById("chuveiro").value) || 0;
  const minutosFerro = parseFloat(document.getElementById("ferro").value) || 0;
  const horasMaquina =
    parseFloat(document.getElementById("maquina").value) || 0;

  //calcula os valores digitados em horas
  const horasChuveiro = minutosChuveiro / 60;
  const horasFerro = minutosFerro / 60;

  //calcula o consumo em kWh
  const consumoChuveiro = (potencias.chuveiro * horasChuveiro) / 1000;
  const consumoFerro = (potencias.ferro * horasFerro) / 1000;
  const consumoMaquina = (potencias.maquina * horasMaquina) / 1000;

  const consumoTotal = consumoChuveiro + consumoFerro + consumoMaquina;

  //exibe o resultado na tela (salva também o valor numérico no dataset para leitura fácil)
  const resultadoEl = document.getElementById("resultado");
  if (resultadoEl) {
    resultadoEl.dataset.kwh = consumoTotal.toFixed(2);
    resultadoEl.innerText = `Seu consumo total de energia é ${consumoTotal.toFixed(
      2
    )} kWh`;
  }

  // atualiza resultado mensal automaticamente
  calcularConsumoMensal();
}

function calcularConsumoMensal() {
  const resultadoEl = document.getElementById("resultado");
  const mensalEl = document.getElementById("resulMensal");
  if (!mensalEl) return; // nada a fazer sem o elemento de destino

  // tenta extrair o valor numérico do dataset (preferível) ou do texto exibido
  let valorKwh = 0;
  if (resultadoEl) {
    const fromData = resultadoEl.dataset.kwh;
    if (fromData) {
      valorKwh = parseFloat(fromData.replace(",", ".")) || 0;
    } else {
      const text = resultadoEl.innerText || "";
      const match = text.match(/([\d\.\,]+)\s*k?W?h?/i);
      if (match && match[1]) {
        // normaliza números com possível separador de milhar e vírgula decimal
        const numStr = match[1].replace(/\./g, "").replace(",", ".");
        valorKwh = parseFloat(numStr) || 0;
      }
    }
  }

  const mensal = valorKwh * 30;
  mensalEl.innerText = `Seu consumo mensal estimado é ${mensal.toFixed(2)} kWh`;
}
