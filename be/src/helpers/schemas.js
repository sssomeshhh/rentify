import { mng } from "./imports.js";

const propertySchema = new mng.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  rent: { type: Number, required: true },
  seller: { type: mng.Schema.Types.ObjectId, ref: "User", required: true }
});

const Property = mng.model("Property", propertySchema);

const userSchema = new mng.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["buyer", "seller"] }
});

const User = mng.model("User", userSchema);

export {
  Property,
  User
};
