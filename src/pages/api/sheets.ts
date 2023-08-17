import type { NextApiRequest, NextApiResponse } from "next";

type Body = {
  Title: string;
  Content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Only POST requests allowed" });
    }

    const body = JSON.parse(req.body as string) as Body;

    const formData = new FormData();

    formData.append("Title", body.Title);
    formData.append("Content", body.Content);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await fetch(process.env.SHEET_SCRIPT_URL!, {
      method: "POST",
      body: formData,
    });

    res.status(200);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
}

/* export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Only POST requests allowed" });
    }

    const body = JSON.parse(req.body as string) as Body;

    const bodyArr = Object.values(body);

    const auth = await google.auth.getClient({
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      requestBody: {
        values: [bodyArr],
      },
      range: "A1:B1",
      valueInputOption: "USER_ENTERED",
    });

    res.status(201).json(response.data);
    // return { title, content };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
}
 */
