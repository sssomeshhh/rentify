import { exp } from "./imports.js";

import { authUser } from "./middlewares.js";
import { propertyAdd, propertyDelete, propertyDetail, propertyList, propertyUpdate, userLogin, userRegister } from "./controllers.js";

const userRouter = exp.Router();

userRouter.put('/register', userRegister);
userRouter.post('/login', userLogin);

const propertyRouter = exp.Router();

propertyRouter.get('/', propertyList);

propertyRouter.get('/detail/:id', propertyDetail);

propertyRouter.use('', authUser);

propertyRouter.put('/', propertyAdd);

propertyRouter.post('/detail/:id', propertyUpdate);
propertyRouter.delete('/detail/:id', propertyDelete);

export {
  userRouter,
  propertyRouter
};
