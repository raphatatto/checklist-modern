// src/logic/manipuladores.ts

import {
    outroTextoContainer,
    outroTextoInput,
    selectOpcoes,
    uploadInput,
    uploadErro,
    semFaturaCheckbox,
    arquivoSelecionado,
    uploadSCDE,
    scdeSelecionado,
    scdeCheckbox,
    scdeUploadArea
  } from '@/logic/domElements';
  
  export function configurarEventos() {
    // Alternar visibilidade do campo 'Outro'
    selectOpcoes.addEventListener("change", () => {
      const selecionados = Array.from(selectOpcoes.selectedOptions).map(opt => opt.value);
      outroTextoContainer.style.display = selecionados.includes("Outro") ? "block" : "none";
    });
  
    // Upload da fatura
    uploadInput.addEventListener("change", () => {
        if ((uploadInput?.files?.length || 0) > 0 || semFaturaCheckbox.checked) {
            if (uploadInput?.files?.length && uploadInput.files[0]) {
            const arquivo = uploadInput.files[0];          
            arquivoSelecionado.innerHTML = `
                <strong>Seu arquivo:</strong> ${arquivo.name} (${(arquivo.size / 1024).toFixed(1)} KB)
          `;
        }
        uploadErro.style.display = "none";
      } else {
        arquivoSelecionado.innerHTML = "";
      }
    });
  
    // Checkbox de \"sem fatura\"
    semFaturaCheckbox.addEventListener("change", () => {
      if (semFaturaCheckbox.checked) {
        uploadErro.style.display = "none";
      }
    });
  
    // Upload SCDE
    uploadSCDE.addEventListener("change", () => {
        if (uploadSCDE?.files && uploadSCDE.files.length > 0) {
            const file = uploadSCDE.files[0];
            scdeSelecionado.innerHTML = `<strong>Arquivo:</strong> ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
          } else {
            scdeSelecionado.innerHTML = "";
          }
    });
  
    // Mostrar/esconder upload do SCDE
    scdeCheckbox?.addEventListener("change", () => {
      scdeUploadArea.style.display = scdeCheckbox.checked ? "block" : "none";
    });
  }
  