import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(
  userId: number,
  title: string,
  description: string
) {
  const result = await client.query(
    `INSERT INTO todos(user_id, title, description) VALUES($1, $2, $3);`,
    [userId, title, description]
  );

  let { rows } = await client.query(
    `SELECT * FROM todos WHERE user_id = $1 AND title = $2 AND description = $3;`,
    [userId, title, description]
  );
  return rows[0];
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
  const result = await client.query(
    `
    UPDATE todos SET
        done = TRUE
        WHERE id = $1;
    `,
    [todoId]
  );

  let { rows } = await client.query(`SELECT * FROM todos WHERE id = $1 ;`, [
    todoId,
  ]);
  return rows[0];
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
  const result = await client.query(
    `
    SELECT * FROM todos WHERE
        user_id = $1;`,
    [userId]
  );

  let { rows } = await client.query(`SELECT * FROM todos WHERE user_id = $1;`, [
    userId,
  ]);
  return rows;
}
