import dotenv from "dotenv";

dotenv.config();

export const connectionString =
  process.env.DATABASE ||
  "mongodb+srv://mongodb-user:vNXBObWAlXbs00Kv@atlascluster.1eln5es.mongodb.net/fifo-db?retryWrites=true&w=majority";
export const PORT = process.env.PORT || 3001;

export const connectionTestString =
  process.env.DATABASE ||
  "mongodb+srv://mongodb-user:vNXBObWAlXbs00Kv@atlascluster.1eln5es.mongodb.net/fifo-test?retryWrites=true&w=majority";

export const jwtSecret = process.env.JWT_SECRET_KEY || "gfg_jwt_secret_key";
