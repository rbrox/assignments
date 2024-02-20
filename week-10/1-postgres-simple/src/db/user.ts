import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(
  username: string,
  password: string,
  name: string
) {
  await client.query(
    `
    INSERT INTO users(username, password, name) VALUES($1, $2, $3)`,
    [username, password, name]
  );
  let { rows } = await client.query(
    `SELECT * FROM users WHERE username = $1 AND password = $2 AND name = $3;`,
    [username, password, name]
  );
  return rows[0];
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  const result = await client.query(
    `
    SELECT * FROM users WHERE
        id = $1
        RETURNING username, password, name;`,
    [userId]
  );
  let { rows } = await client.query(`SELECT * FROM users WHERE id = $1 ;`, [
    userId,
  ]);
  return rows[0];
}
