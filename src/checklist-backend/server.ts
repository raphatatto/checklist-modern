import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import formidable, { Files, Fields } from 'formidable';
import FormData from 'form-data';
import fetch from 'node-fetch';

// ===== Tipagens =====
type MondayCreateItemResponse = {
  data?: {
    create_item?: {
      id: string;
    };
  };
  errors?: any;
};

interface ChecklistRequestBody {
  respostas: string[];
}

// ===== App config =====
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ===== Rota de envio de formulário =====
app.post(
  '/api/enviar-formulario',
  async (req: Request<any, any, ChecklistRequestBody>, res: Response) => {
    try {
      const respostas = req.body.respostas;

      const columnValues: Record<string, string> = {
        text_mkpjsmpc: respostas[0],
        text_mkq9ep39: respostas[2],
        text_mkpnrmd0: respostas[3],
        text_mkpn766e: respostas[4],
        text_mkpnn53k: respostas[5],
        text_mkpnxs2v: respostas[6],
        text_mkpnza93: respostas[7],
        text_mkpnzzsa: respostas[8],
        text_mkpncg6g: respostas[9],
        text_mkpnj2z2: respostas[10],
        text_mkpn67sw: respostas[11],
        text_mkpntpbk: respostas[12],
        text_mkpndc5k: respostas[13],
        text_mkpn1nf1: respostas[14],
        text_mkpnc0wq: respostas[15],
        text_mkpnh13t: respostas[16],
      };

      const mutation = {
        query: `
          mutation {
            create_item(
              board_id: ${process.env.MONDAY_BOARD_ID},
              item_name: "Checklist ${respostas[0]} - ${new Date().toLocaleDateString()}",
              column_values: "${JSON.stringify(columnValues).replace(/"/g, '\\"')}"
            ) {
              id
            }
          }`,
      };

      const response = await fetch('https://api.monday.com/v2', {
        method: 'POST',
        headers: {
          Authorization: process.env.MONDAY_API_TOKEN!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mutation),
      });

      const result = (await response.json()) as MondayCreateItemResponse;

      if (result.errors) {
        console.error('❌ Erros retornados:', result.errors);
        return res.status(500).json({ error: 'Erro ao enviar para o Monday', detalhe: result.errors });
      }

      res.status(200).json(result);
    } catch (err: any) {
      console.error('❌ Erro inesperado:', err);
      res.status(500).json({ error: 'Erro interno ao enviar formulário', detalhe: err.message });
    }
  }
);

// ===== Rota de upload do PDF =====
app.post('/api/upload-pdf', (req: Request, res: Response) => {
  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields: Fields, files: Files) => {
    if (err) return res.status(500).send('Erro ao processar arquivo.');

    const fileArray = files.arquivo;
    const itemId = Array.isArray(fields.itemId) ? fields.itemId[0] : fields.itemId ?? '';
    const coluna = Array.isArray(fields.coluna) ? fields.coluna[0] : fields.coluna ?? 'file_mkpn46xc';

    if (!fileArray || !itemId) {
      return res.status(400).json({ error: 'Arquivo ou itemId ausente.' });
    }

    const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;
    const filePath = (file as any).filepath || (file as any).path;

    const formData = new FormData();
    formData.append(
      'query',
      `
        mutation ($file: File!) {
          add_file_to_column(file: $file, item_id: ${itemId}, column_id: "${coluna}") {
            id
          }
        }`
    );
    formData.append('variables[file]', fs.createReadStream(filePath));

    try {
      const response = await fetch('https://api.monday.com/v2/file', {
        method: 'POST',
        headers: {
          Authorization: process.env.MONDAY_API_TOKEN!,
        },
        body: formData as any,
      });

      const result = await response.json();
      res.json(result);
    } catch (error) {
      console.error('Erro ao enviar para Monday:', error);
      res.status(500).send('Erro ao enviar arquivo para Monday');
    }
  });
});

// ===== Iniciar servidor =====
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
