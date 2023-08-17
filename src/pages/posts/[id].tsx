import { google } from "googleapis";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Post({
  title,
  content,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  title: string;
  content: string;
}> = async () => {
  const auth = await google.auth.getClient({
    scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
  });

  const sheets = google.sheets({ version: "v4", auth });

  const range = `sign-ups!A2:B2`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range,
  });

  const resValues = response.data.values as unknown as string[];

  const [title, content] = resValues[0] as unknown as string[];

  return { props: { title, content } };
};
