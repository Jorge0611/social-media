import pg from "pg";

export async function runQuery<T extends pg.QueryResultRow>(
  query: string,
  params?: (string | number | undefined)[]
): Promise<pg.QueryResult<T>> {
  const client = getClient();
  client.connect();
  const result = (await client.query(query, params)) as pg.QueryResult<T>;
  client.end();
  return result;
}

export function getClient(): pg.Client {
  const params: pg.ClientConfig = {
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT) || 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  };

  return new pg.Client(params);
}
