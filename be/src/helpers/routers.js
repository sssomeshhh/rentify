import { exp } from "./imports.js";

import { authUser } from "./middlewares.js";
import { propertyAdd, propertyDelete, propertyDetail, propertyList, propertyUpdate, userLogin, userRegister } from "./controllers.js";

const apiRouter = exp.Router();
const userRouter = exp.Router();
const propertyRouter = exp.Router();

apiRouter.use('/property', propertyRouter);
apiRouter.use('/user', userRouter);

userRouter.put('/register', userRegister);
userRouter.post('/login', userLogin);

propertyRouter.get('/', propertyList);
propertyRouter.get('/detail/:id', propertyDetail);

propertyRouter.use('', authUser);

propertyRouter.put('/', propertyAdd);
propertyRouter.post('/detail/:id', propertyUpdate);
propertyRouter.delete('/detail/:id', propertyDelete);

export {
  apiRouter
};
