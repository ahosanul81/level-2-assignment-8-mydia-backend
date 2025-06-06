import app from "./app";
import config from "./config";

async function main() {
  const server = app.listen(process.env.PORT, () => {
    console.log("Sever is running on port ", config.port);
  });
}

main();
