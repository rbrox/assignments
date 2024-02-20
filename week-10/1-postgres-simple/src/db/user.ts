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
  const result = await client.query(
    `
    INSERT INTO users VALUES($1, $2, $3)`,
    [username, password, name]
  );
  return result;
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
  return result;
}
