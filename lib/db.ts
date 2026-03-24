import { neon } from "@neondatabase/serverless";

type Row = Record<string, unknown>;

let client: ReturnType<typeof neon> | null = null;

function getClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!client) {
    client = neon(process.env.DATABASE_URL);
  }

  return client;
}

export function sql<T extends Row = Row>(
  strings: TemplateStringsArray,
  ...values: unknown[]
) {
  return getClient()(strings, ...values) as Promise<T[]>;
}
