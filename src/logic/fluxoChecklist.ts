// fluxoChecklist.ts - Contém toda a lógica de fluxo do formulário

import {
    etapaAtual,
    totalEtapas,
    respostas,
    arquivoFatura,
    modoArbitragem,
    modoBackup,
    modoOutros,
    modoPeakShaving,
    redirecionouBackup,
    redirecionouOutros,
    redirecionouPeak,
    etapaAnterior,
    arquivoSCDE,
    historicoEtapas
  } from "./estadosChecklist";
  
  import {
    perguntaTexto,
    respostaInput,
    toggleText,
    progressoTexto,
    textoAjuda,
    inputBoxTexto,
    inputBoxArquivo,
    inputBoxCheckBox,
    inputBoxRadio,
    painelLateral,
    styleTag,
    scdeContainer,
    scdeUploadArea,
    scdeCheckbox
  } from "./domElements";
  
  import { perguntas, placeholders, curiosidades, imagensPerguntas } from "../data/perguntas";
  import { gerarPDF } from "@/checklist-backend/gerarPDF";
  
  export function atualizarProgresso() {
    if (progressoTexto) {
      progressoTexto.textContent = `Etapa ${etapaAtual + 1} de ${totalEtapas}`;
    }
  }
  
  export function devePularPergunta(index: number): boolean {
    if (index <= 2) return false;
    if (index === 4 && respostas[3]?.toLowerCase() !== "sim") return true;
    if ([6, 7, 8, 9].includes(index) && respostas[5]?.toLowerCase() !== "sim" && !(modoOutros && redirecionouOutros)) {
      return true;
    }
    if (modoArbitragem && (index < 3 || index > 11)) return true;
  
    if (modoPeakShaving) {
      if ([13, 14, 15, 16].includes(index)) return true;
      if (index < 3 && index !== 12) return true;
      if (modoPeakShaving && redirecionouPeak && index === 12) return true;
    }
    if (modoBackup) {
      if (!redirecionouBackup) {
        if (index < 13 || index > 16) return true;
      } else {
        if (index < 3 || index > 11) return true;
      }
    }
    if (modoOutros) {
      if (redirecionouOutros) {
        if (index < 2 || index > 11) return true;
      } else {
        if (index < 12 || index > 16) return true;
      }
    }
    return false;
  }
  
  export function atualizarPergunta() {
    perguntaTexto.textContent = perguntas[etapaAtual];
    respostaInput.value = respostas[etapaAtual] || "";
    respostaInput.placeholder = "Digite aqui...";
    textoAjuda.textContent = placeholders[etapaAtual] || "";
    toggleText.innerHTML = `<h1>${curiosidades[etapaAtual] || "Obrigado por responder!"}</h1>`;
  
    inputBoxTexto.style.display = "none";
    inputBoxArquivo.style.display = "none";
    inputBoxCheckBox.style.display = "none";
    inputBoxRadio.style.display = "none";
  
    if (etapaAtual === 1) inputBoxArquivo.style.display = "block";
    else if (etapaAtual === 2) inputBoxCheckBox.style.display = "block";
    else if ([3, 5].includes(etapaAtual)) inputBoxRadio.style.display = "block";
    else inputBoxTexto.style.display = "block";
  
    setTimeout(() => respostaInput.focus(), 50);
  
    const novaImagem = imagensPerguntas[etapaAtual % imagensPerguntas.length];
    styleTag.innerHTML = `.toggle-panel.toggle-left::after { background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${novaImagem}'); }`;
    painelLateral.classList.add("show-new-bg");
    setTimeout(() => painelLateral.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${novaImagem}')`, 800);
    setTimeout(() => painelLateral.classList.remove("show-new-bg"), 1600);
  
    if (etapaAtual === 12) {
      scdeContainer.style.display = "block";
    } else {
      scdeContainer.style.display = "none";
      scdeUploadArea.style.display = "none";
      scdeCheckbox.checked = false;
    }
  }
  
  export async function finalizarFormulario() {
    respostas[etapaAtual] = respostaInput.value.trim();
    const form = document.getElementById("formPerguntas") as HTMLElement;
    form.innerHTML = `<div class="finalizacao"><h2>Enviando CheckList, aguarde...</h2><p>Aguarde enquanto salvamos suas respostas.</p></div>`;
  
    try {
      const response = await fetch("https://checklist-final.onrender.com/api/enviar-formulario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respostas })
      });
  
      const result = await response.json();
      const itemId = result.data?.create_item?.id;
  
      if (itemId) {
        if (arquivoFatura) {
          const formData = new FormData();
          formData.append("arquivo", arquivoFatura);
          formData.append("itemId", itemId);
          formData.append("coluna", "file_mkq2g4mm");
  
          await fetch("https://checklist-final.onrender.com/api/upload-pdf", {
            method: "POST",
            body: formData
          });
        }
        if (arquivoSCDE) {
          respostas.push("Arquivo SCDE anexado");
  
          const formDataSCDE = new FormData();
          formDataSCDE.append("arquivo", arquivoSCDE);
          formDataSCDE.append("itemId", itemId);
          formDataSCDE.append("coluna", "file_mkqq7eha");
  
          await fetch("https://checklist-final.onrender.com/api/upload-pdf", {
            method: "POST",
            body: formDataSCDE
          });
        } else {
          respostas.push("Arquivo SCDE não anexado");
        }
        await gerarPDF(respostas, perguntas, itemId);
  
        form.innerHTML = `<div class="finalizacao"><h2>Checklist enviado!</h2><p>Seu formulário foi registrado em nossa plataforma.</p></div>`;
      } else {
        throw new Error("Erro ao salvar item no Monday");
      }
    } catch (err: any) {
      form.innerHTML = `<div class="finalizacao"><h2>Erro ao enviar</h2><p>${err.message}</p></div>`;
    }
  }
  