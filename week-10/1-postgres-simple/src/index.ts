import { Client } from "pg";
import { DB_URL } from "./config";

export const client = new Client({
  connectionString: DB_URL,
});

client.connect();

import { createTables, dropTables } from "./db/setup";
import { createUser } from "./db/user";

async function createUserExample() {
  try {
    await dropTables();

    await createTables();
    // Call the createUser function with sample data
    const result = await createUser("john_doe", "password123", "John Doe");

    // Log the result
    console.log("User created:", result);
  } catch (error) {
    // Handle any errors
    console.error("Error creating user:", error);
  }
}
createUserExample();
