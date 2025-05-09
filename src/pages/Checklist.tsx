// src/components/ChecklistForm.tsx
import { useState, useEffect } from "react";
import React from "react";

export default function ChecklistForm() {
  return (
    <div className="container">
      {/* Caixa inicial */}
      <div className="form-box login">
        <form onSubmit={(e) => e.preventDefault()}>
          <img src="./img/Logo Verde.png" alt="Logo" />
          <p className="title">Checklist Técnico para projetos C&I</p>
          <button type="button" className="btn" id="startButton">
            Vamos Lá!
          </button>
        </form>
      </div>

      {/* Caixa da pergunta */}
      <div className="form-box question hidden">
        <form id="formPerguntas" onSubmit={(e) => e.preventDefault()}>
          <img src="./img/Logo Verde.png" alt="Logo" className="logo-perguntas" />

          <h2 className="pergunta" id="perguntaTexto">Qual é a pergunta?</h2>
          <p className="dica-pergunta" id="textoAjuda"></p>

          {/* Input Texto */}
          <div className="input-box" id="inputBoxTexto">
            <input
              type="text"
              className="input-projeto"
              id="respostaInput"
              placeholder="Digite aqui"
            />
          </div>

          {/* SCDE */}
          <div id="scdeExtraContainer" className="hidden mt-2">
            <label>
              <input type="checkbox" id="scdeCheckbox" /> A unidade está aderida à CCEE e possui medição SCDE
            </label>

            <div id="scdeUploadArea" className="hidden mt-2">
              <label htmlFor="uploadSCDE" className="custom-upload-button">
                <i className="fa-solid fa-arrow-up-from-bracket"></i> Anexar Medição SCDE
              </label>
              <input type="file" id="uploadSCDE" className="hidden" />
              <div id="scdeSelecionado" className="mt-2 text-sm"></div>
              <div id="erroSCDE" className="text-red-600 mt-1 hidden"></div>
            </div>
          </div>

          {/* Input Arquivo */}
          <div id="inputBoxArquivo" className="hidden">
            <div className="mt-2">
              <label>
                <input type="checkbox" id="semFaturaCheckbox" /> Não estou conectado a rede de distribuição (off-grid)
              </label>
            </div>
            <label htmlFor="uploadFatura" className="custom-upload-button">
              <i className="fa-solid fa-arrow-up-from-bracket"></i>Escolher Arquivo
            </label>
            <div
              id="arquivoSelecionado"
              className="arquivoAdicionado mt-2 text-sm text-gray-800"
            ></div>
            <input type="file" id="uploadFatura" className="hidden" />
            <div id="uploadErro" className="text-red-600 mt-2 hidden"></div>
          </div>

          {/* Input CheckBox */}
          <div id="inputBoxCheckBox" className="hidden">
            <select id="selectOpcoes" name="opcoes">
              <option value="">Selecione uma opção...</option>
              <option value="Arbitragem/Load Shifting">Arbitragem/Load Shifting</option>
              <option value="Backup">Backup</option>
              <option value="Peak Shaving">Peak Shaving</option>
              <option value="Não sei, me ajude com isso">Não sei, me ajude com isso</option>
              <option value="Outro">Outro (Descreva abaixo)</option>
            </select>

            <div id="outroTextoContainer" className="hidden mt-2">
              <label htmlFor="outroTexto">Descreva sua opção:</label>
              <input type="text" id="outroTexto" placeholder="Escreva aqui..." />
            </div>
          </div>

          {/* Input Radio */}
          <div id="inputBoxRadio" className="hidden">
            <label>
              <input type="radio" name="respostaRadio" value="Sim" /> Sim
            </label>
            <label>
              <input type="radio" name="respostaRadio" value="Não" /> Não
            </label>
            <div id="opcaoErro" className="text-red-600 mt-2 hidden"></div>
          </div>

          {/* Botões */}
          <div className="botoes">
            <button type="button" className="btn hidden" id="prevButton">
              Anterior
            </button>
            <button type="submit" className="btn" id="nextButton">
              Próxima
            </button>
          </div>
        </form>
      </div>

      {/* Texto lateral */}
      <div className="toggle-box">
        <div className="toggle-panel toggle-left" id="toggleText">
          <div className="frase-container">
            <h1>Pioneirismo em Armazenamento de Grande Porte na América Latina</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
