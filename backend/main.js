const morgan = require('morgan')
const express = require("express");
const { pool } = require("./mysql_db");
const mongoClient = require("./mongo_db");
const bodyParser = require("body-parser");
require("dotenv").config();

const apiRouter = require("./routes/api");
const loginRouter = require("./routes/login")

const app = express();
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api", apiRouter);
app.use("/login", loginRouter)

const PORT =
	parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

const startSQL = pool
	.getConnection()
	.then((conn) => {
		conn.ping();
		console.log("pinged");
		return conn;
	})
	.then((conn) => conn.release());

const p0 = new Promise((resolve, reject) => {
	if (
		!!process.env.AWS_S3_ACCESS_KEY &&
		!!process.env.AWS_S3_SECRET_ACCESSKEY
	)
		resolve();
	else reject(`S3 keys not found`);
});

Promise.all([mongoClient.connect(), startSQL, p0])
    .then(()=> {
        app.listen(PORT, ()=> {
            console.log(`${PORT} started on ${new Date()}`)
        })
    })
