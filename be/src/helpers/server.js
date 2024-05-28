import { crs, exp, pth, url } from "./imports.js";

import { connectDatabase } from "./database.js";
import { evalPopulate } from "./populate.js";
import { apiRouter } from "./routers.js";

const startServer = () => {
  const app = exp();

  const isEval = process.env.IS_EVAL;

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

  connectDatabase().then(() => {
    if (isEval === 'true') {
      evalPopulate().then(() => {
        console.log('[server] Populated database with sample data for evaluation');
      });
    }
  });

  app.listen(serverPort, () => {
    console.log(`[server] Listening on port ${serverPort}`);
  });
};

export { startServer };
