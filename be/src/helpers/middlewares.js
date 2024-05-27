import { tokenVerify } from "./authorization.js";

const authUser = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access Denied!' });
  }
  try {
    req.user = tokenVerify(token);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid Token!' });
  }
};

export { authUser };
