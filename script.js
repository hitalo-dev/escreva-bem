const ids = [
  "tema","problema","tese",
  "conectivoIntro","conectivoD1","arg1","rep1",
  "conectivoD2","arg2","rep2",
  "conectivoConc","agente","acao","meio","finalidade"
];

const el = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));
const saida = document.getElementById("saida");

function val(id) {
  return (el[id].value || "").trim();
}

function montarTexto() {
  const tema = val("tema");
  const problema = val("problema");
  const tese = val("tese");

  const intro = `${val("conectivoIntro")} o tema "${tema}" evidencia um problema relevante: ${problema}. Nesse contexto, ${tese}`;

  const d1 = `${val("conectivoD1")} um fator que agrava essa questão é ${val("arg1")}. Isso se mostra preocupante, pois amplia os impactos negativos do problema. Nesse sentido, ${val("rep1")} reforça a gravidade da situação.`;

  const d2 = `${val("conectivoD2")} soma-se a isso ${val("arg2")}, o que dificulta a superação do quadro atual. Dessa maneira, ${val("rep2")} exemplifica como esse obstáculo afeta a sociedade.`;

  const conc = `${val("conectivoConc")} para enfrentar o problema, ${val("agente")} deve(m) ${val("acao")}, ${val("meio")}, a fim de ${val("finalidade")}. Assim, será possível reduzir os efeitos do problema e avançar no tema.`;

  saida.value = [intro, d1, d2, conc].join("\n\n");
}

ids.forEach(id => el[id].addEventListener("input", montarTexto));
montarTexto();

document.getElementById("btnCopiar").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(saida.value);
    alert("Copiado!");
  } catch {
    saida.select();
    document.execCommand("copy");
    alert("Copiado!");
  }
});

document.getElementById("btnLimpar").addEventListener("click", () => {
  ids.forEach(id => (el[id].value = ""));
  montarTexto();
});
