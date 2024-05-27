import { cry, jwt } from "./imports.js";


const privateKey = cry.randomBytes(16).toString('hex');

const tokenSign = (payload, options) => {
  return jwt.sign(payload, privateKey, options);
};

const tokenVerify = (token) => {
  return jwt.verify(token, privateKey);
}

export {
  tokenSign,
  tokenVerify
};
