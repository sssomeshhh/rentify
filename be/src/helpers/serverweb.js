import { crs, exp, pth, url } from "./imports.js";

import { serverWebPort } from "./environment.js";

const startServerWeb = () => {
  const app = exp();

  app.use(crs());
  app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
      next();
    } else {
      res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
      res.header("Expires", "-1");
      res.header("Pragma", "no-cache");
      res.sendFile(`${statdir}/index.html`);
    }
  });

  const statdir = pth.join(pth.dirname(url.fileURLToPath(import.meta.url)), "../../../fe/build");

  app.use(exp.static(statdir));

  app.get('/', (req, res) => {
    res.sendFile(`${statdir}/index.html`)
  });

  app.listen(serverWebPort, () => {
    console.log(`[serverWeb] Listening on port ${serverWebPort}`);
  });
};

export { startServerWeb };
