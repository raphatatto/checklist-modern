// checklist.ts - Arquivo principal que conecta tudo

import { perguntas } from "@/data/perguntas";
import { gerarPDF } from "@/checklist-backend/gerarPDF";

import {
  etapaAtual,
  totalEtapas,
  respostas,
  arquivoFatura,
  modoArbitragem,
  modoPeakShaving,
  modoBackup,
  modoOutros,
  redirecionouPeak,
  redirecionouBackup,
  redirecionouOutros,
  etapaAnterior,
  arquivoSCDE,
  historicoEtapas
} from "@/logic/estadosChecklist";

import {
  startButton,
  loginBox,
  questionBox,
  toggleText,
  perguntaTexto,
  respostaInput,
  nextButton,
  prevButton,
  erroOpcao,
  uploadInput,
  arquivoSelecionado,
  outroTextoContainer,
  outroTextoInput,
  selectOpcoes,
  semFaturaCheckbox,
  uploadErro,
  uploadSCDE,
  scdeSelecionado,
  scdeCheckbox,
  scdeUploadArea,
  progressoTexto,
  textoAjuda,
  inputBoxTexto,
  inputBoxArquivo,
  inputBoxCheckBox,
  inputBoxRadio,
  painelLateral,
  styleTag,
  scdeContainer
} from "@/logic/domElements";

import {
  atualizarPergunta,
  atualizarProgresso,
  devePularPergunta,
  finalizarFormulario
} from "@/logic/fluxoChecklist";

import { configurarEventos } from "@/logic/manipuladores";

window.addEventListener("load", () => {
  atualizarProgresso();
  configurarEventos();
});
