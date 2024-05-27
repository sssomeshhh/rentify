import { bcr } from "./imports.js";

import { Property, User } from "./schemas.js";
import { tokenSign } from "./authorization.js";

const userRegister = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, role } = req.body;
  try {
    const hashedPassword = await bcr.hash(password, 10);
    const dbq = await User.create({ firstName, lastName, email, phoneNumber, role, password: hashedPassword });
    res.status(201).json(dbq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }
    const isMatch = await bcr.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }
    const token = tokenSign({ id: user._id, role: user.role }, { expiresIn: '1h' });
    res.status(200).json({ email, token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const propertyList = async (req, res) => {
  try {
    const dbq = await Property.find().populate('seller');
    res.status(200).json(dbq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const propertyAdd = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ error: "Access Denied!" });
    }
    const dbq = await Property.create({ ...req.body, seller: req.user.id });
    res.status(201).json(dbq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const propertyDetail = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ error: "Access Denied!" });
    }
    const dbq = await Property.findOne({ _id: req.params.id });
    res.status(201).json(dbq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const propertyUpdate = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ error: "Access Denied!" });
    }
    const dbq = await Property.updateOne({ _id: req.params.id }, req.body);
    res.status(201).json(dbq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const propertyDelete = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ error: "Access Denied!" });
    }
    const dbq = await Property.deleteOne({ _id: req.params.id });
    res.status(201).json(dbq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  userLogin,
  userRegister,
  propertyList,
  propertyAdd,
  propertyDetail,
  propertyUpdate,
  propertyDelete
};
