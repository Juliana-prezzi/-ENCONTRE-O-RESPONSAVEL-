function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle("Valandroide - Assistente Virtual")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function gerarResposta(pergunta) {
  if (!pergunta || typeof pergunta !== "string") {
    return "❌ Nenhuma pergunta válida foi recebida. Verifique se você selecionou um tema e subtema.";
  }

  const planilha = SpreadsheetApp.openById("1P2fnwD4Fv8JA1fVjsQzNgkfIYtV7h0lvqSmheyHWZBM");
  const aba = planilha.getSheetByName("Responsaveis");
  const dados = aba.getDataRange().getValues();

  const partes = pergunta.split(":");
  if (partes.length < 2) {
    return "Por favor, selecione um tema e um subtema (empresa).";
  }

  const tema = partes[0].trim().toUpperCase();
  const empresa = partes[1].trim().toUpperCase();

  for (let i = 1; i < dados.length; i++) {
    const linhaTema = dados[i][0].toString().toUpperCase();
    const linhaEmpresa = dados[i][1].toString().toUpperCase();
    const responsavel = dados[i][2];

    if (linhaTema === tema && linhaEmpresa === empresa) {
      return `✅ O responsável por *${empresa}* no tema *${tema}* é:\n\n👤 ${responsavel}`;
    }
  }

  return `⚠️ Desculpe, não encontrei o responsável por *${empresa}* no tema *${tema}*.`;
}
