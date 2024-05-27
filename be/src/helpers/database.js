import {mng} from "./imports.js";

const connect = async () => {
  try {
    await mng.connect('mongodb://localhost:27017/', { dbName: "rentify" });
    console.log('[serverApi] MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export { connect };
