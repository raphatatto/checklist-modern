// src/logic/domElements.ts

// Botões e containers
export const startButton = document.getElementById('startButton') as HTMLButtonElement;
export const loginBox = document.querySelector('.form-box.login') as HTMLElement;
export const questionBox = document.querySelector('.form-box.question') as HTMLElement;
export const toggleText = document.getElementById('toggleText') as HTMLElement;
export const perguntaTexto = document.getElementById("perguntaTexto") as HTMLElement;
export const respostaInput = document.getElementById("respostaInput") as HTMLInputElement;
export const nextButton = document.getElementById("nextButton") as HTMLButtonElement;
export const prevButton = document.getElementById("prevButton") as HTMLButtonElement;
export const erroOpcao = document.getElementById("opcaoErro") as HTMLElement;
export const uploadInput = document.getElementById("uploadFatura") as HTMLInputElement;
export const arquivoSelecionado = document.getElementById("arquivoSelecionado") as HTMLElement;
export const outroTextoContainer = document.getElementById("outroTextoContainer") as HTMLElement;
export const outroTextoInput = document.getElementById("outroTexto") as HTMLInputElement;
export const selectOpcoes = document.getElementById("selectOpcoes") as HTMLSelectElement;
export const semFaturaCheckbox = document.getElementById("semFaturaCheckbox") as HTMLInputElement;
export const uploadErro = document.getElementById("uploadErro") as HTMLElement;
export const uploadSCDE = document.getElementById("uploadSCDE") as HTMLInputElement;
export const scdeSelecionado = document.getElementById("scdeSelecionado") as HTMLElement;
export const scdeCheckbox = document.getElementById("scdeCheckbox") as HTMLInputElement;
export const scdeUploadArea = document.getElementById("scdeUploadArea") as HTMLElement;
export const progressoTexto = document.getElementById('progressText') as HTMLElement;
export const textoAjuda = document.getElementById("textoAjuda") as HTMLElement;
export const inputBoxTexto = document.getElementById("inputBoxTexto") as HTMLElement;
export const inputBoxArquivo = document.getElementById("inputBoxArquivo") as HTMLElement;
export const inputBoxCheckBox = document.getElementById("inputBoxCheckBox") as HTMLElement;
export const inputBoxRadio = document.getElementById("inputBoxRadio") as HTMLElement;
export const painelLateral = document.querySelector('.toggle-panel.toggle-left') as HTMLElement;
export const styleTag =
  document.getElementById('dynamic-bg-style') as HTMLStyleElement ||
  (() => {
    const style = document.createElement('style');
    style.id = 'dynamic-bg-style';
    document.head.appendChild(style);
    return style;
  })();
export const scdeContainer = document.getElementById("scdeExtraContainer") as HTMLElement;
