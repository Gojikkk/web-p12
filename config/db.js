const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "uts",
});

db.connect ((err) => {
    if (err) {
        console.error("Koneksi Database gagal: ", err);
        return;
    }
    console.log("Connected ke MySQL");
})

module.exports = db;