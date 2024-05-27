import { crs, exp } from "./imports.js";

import { connect as connectDB } from "./database.js";
import { serverApiPort } from "./environment.js";
import { propertyRouter, userRouter } from "./routers.js";

const startServerApi = () => {
  const app = exp();

  app.use(crs());
  app.use(exp.json());

  app.use('/property', propertyRouter);
  app.use('/user', userRouter);

  connectDB().then(() => {});

  app.listen(serverApiPort, () => {
    console.log(`[serverApi] Listening on port ${serverApiPort}`);
  });
};

export { startServerApi };
