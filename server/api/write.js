import { google } from 'googleapis';
import { readFile } from 'fs/promises';

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // 接收前端送來的值
  const values = body.values || [];

  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.NODE_ENV === 'production' ? '/etc/secrets/service-account.json' : 'server/keys/service-account.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const config = useRuntimeConfig()
  const spreadsheetId = config.public.NUXT_SHEET_ID;
  const range = '工作表1!A1';

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [values],
    },
  });

  return { success: true, data: response.data };
});