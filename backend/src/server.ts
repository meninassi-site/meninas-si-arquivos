import { app } from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log(`Meninas de Sistemas API listening on http://localhost:${env.port}`);
});
