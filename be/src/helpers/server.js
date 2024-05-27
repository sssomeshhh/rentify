import { crs, exp, pth, url } from "./imports.js";

import { connectDatabase } from "./database.js";
import { apiRouter } from "./routers.js";

const startServer = () => {
  const app = exp();

  const serverPort = process.env.SERVER_PORT;

  const staticDir = pth.join(pth.dirname(url.fileURLToPath(import.meta.url)), "../../../fe/build");

  app.use(crs());
  app.use(exp.json());

  app.use('/api', apiRouter);

  app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
      next();
    } else {
      res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
      res.header("Expires", "-1");
      res.header("Pragma", "no-cache");
      res.sendFile(`${staticDir}/index.html`);
    }
  });

  app.use(exp.static(staticDir));

  app.get('/', (req, res) => {
    res.sendFile(`${staticDir}/index.html`)
  });

  connectDatabase().then(() => {});

  app.listen(serverPort, () => {
    console.log(`[server] Listening on port ${serverPort}`);
  });
};

export { startServer };
