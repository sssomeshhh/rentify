import {mng} from "./imports.js";

const connectDatabase = async () => {
  try {
    await mng.connect('mongodb://localhost:27017/', { dbName: "rentify" });
    console.log('[server] MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export { connectDatabase };
