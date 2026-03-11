import { buildServer } from "./api/server.js";

async function main() {
  const app = buildServer();

  try {
    await app.listen({
      host: app.config.HOST,
      port: app.config.PORT,
    });
  } catch (error) {
    app.log.error(error, "failed to start server");
    process.exit(1);
  }
}

main();
