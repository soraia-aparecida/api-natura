import { createConnection } from "typeorm";

createConnection().then(async () => {
  console.info("Database is connected");
});
