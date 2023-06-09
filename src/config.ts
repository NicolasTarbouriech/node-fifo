import dotenv from "dotenv";

dotenv.config();

export const connectionString = process.env.DATABASE || 'mongodb+srv://mongodb-user:vNXBObWAlXbs00Kv@atlascluster.1eln5es.mongodb.net/fifo-db?retryWrites=true&w=majority';
export const PORT = process.env.PORT || 3001;
