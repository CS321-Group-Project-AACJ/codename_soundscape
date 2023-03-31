// import { MongoClient } from "mongodb";
// const {MongoClient} = require("mongodb");

// const connectionString = process.env.DATABASE_URL || "";

// const client = new MongoClient(connectionString);

// let conn;
// try {
//     conn = await client.connect();
// } catch (error) {
//     console.log(error);
// }

// let db = conn.db("codename_soundscape");
// export default db;
/////////////////////////////////
import mongoose from "mongoose";

const connectionString = process.env.DATABASE_URL || "";
const db = mongoose.connect(connectionString);