// src/logic/estadosChecklist.ts

import { perguntas } from "../data/perguntas";

export let etapaAtual = 0;
export const totalEtapas = perguntas.length;
export const respostas: string[] = [];
export let arquivoFatura: File | null = null;
export let modoArbitragem = false;
export let modoPeakShaving = false;
export let modoBackup = false;
export let modoOutros = false;
export let redirecionouPeak = false;
export let redirecionouBackup = false;
export let redirecionouOutros = false;
export let etapaAnterior: number | null = null;
export let arquivoSCDE: File | null = null;
export const historicoEtapas: number[] = [];
