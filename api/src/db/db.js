import mysql from "mysql"
import dotenv from "dotenv"
dotenv.config()

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "blog"
})

db.connect()

export default db