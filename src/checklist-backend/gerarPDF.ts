// src/lib/gerarPDF.ts

import jsPDF from "jspdf";

export async function gerarPDF(
  respostas: string[],
  perguntas: string[],
  itemId: string
): Promise<void> {
  const doc = new jsPDF();

  const nomeCliente = respostas[0] || "Nome não informado";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(`Checklist Técnico - ${nomeCliente}`, 105, 20, { align: "center" });

  const pageHeight = doc.internal.pageSize.getHeight();
  const margemTopo = 45;
  const margemInferior = 20;
  const alturaLinha = 8;
  let y = margemTopo;

  perguntas.forEach((pergunta, index) => {
    if (!pergunta) return;

    let resposta = respostas[index];
    let textoResposta = resposta?.trim()
      ? resposta
      : resposta === undefined
        ? "Pergunta não necessária para essa solução"
        : "Pergunta não respondida";

    const textoPergunta = `${index + 1}. ${pergunta}`;
    const linhasPergunta = doc.splitTextToSize(textoPergunta, 180);
    const linhasResposta = doc.splitTextToSize(textoResposta, 180);
    const alturaBloco = (linhasPergunta.length + linhasResposta.length) * alturaLinha + 4;

    if (y + alturaBloco > pageHeight - margemInferior) {
      doc.addPage();
      y = margemTopo;
    }

    doc.setFont("helvetica", "bold").setFontSize(12);
    doc.text(linhasPergunta, 10, y);
    y += linhasPergunta.length * alturaLinha;

    doc.setFont("helvetica", "normal").setFontSize(12);
    doc.text(linhasResposta, 10, y);
    y += linhasResposta.length * alturaLinha + 6;
  });

  // Adicionar informação do SCDE
  const statusSCDE = respostas[respostas.length - 1];
  if (statusSCDE?.includes("SCDE")) {
    const scdePergunta = "12b. Arquivo SCDE foi anexado?";
    const scdeResposta = statusSCDE;
    const linhasPerguntaSCDE = doc.splitTextToSize(scdePergunta, 180);
    const linhasRespostaSCDE = doc.splitTextToSize(scdeResposta, 180);
    const alturaBlocoSCDE = (linhasPerguntaSCDE.length + linhasRespostaSCDE.length) * alturaLinha + 4;

    if (y + alturaBlocoSCDE > pageHeight - margemInferior) {
      doc.addPage();
      y = margemTopo;
    }

    doc.setFont("helvetica", "bold").text(linhasPerguntaSCDE, 10, y);
    y += linhasPerguntaSCDE.length * alturaLinha;

    doc.setFont("helvetica", "normal").text(linhasRespostaSCDE, 10, y);
    y += linhasRespostaSCDE.length * alturaLinha + 6;
  }

  const pdfBlob = doc.output("blob");
  const formData = new FormData();
  const nomeChecklist = nomeCliente.replace(/[^\w\s\-]/gi, '').replace(/\s+/g, '_') || 'checklist';
  formData.append("arquivo", pdfBlob, `${nomeChecklist}.pdf`);
  formData.append("itemId", itemId);

  try {
    await fetch("https://checklist-final.onrender.com/api/upload-pdf", {
      method: "POST",
      body: formData
    });
    console.log("✅ PDF enviado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao enviar o PDF:", error);
  }
}
