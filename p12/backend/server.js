const express = require('express');
const cors = require('cors');
const mysql = require('./mysql');
const Log = require('./mongo');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/barang', (req, res) => {
    const sql = 'SELECT * FROM barang';
    mysql.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/barang', (req, res) => {
    const { nama, harga } = req.body;
    const sql = 'INSERT INTO barang (nama, harga) VALUES (?, ?)';
    mysql.query(sql, [nama, harga], async (err, result) => {
        if (err) return res.status(500).send(err);
        try {
            await Log.create({
                message: `Barang ${nama} dengan harga ${harga} berhasil ditambahkan`,
                timestamp: new Date()
            });
            res.json({ status: 'success' });
        } catch (error) {
            res.status(500).send(error);
        }
    });
});

app.get('/pembelian', (req, res) => {
    const sql = 'SELECT * FROM pembelian';
    mysql.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/pembelian', (req, res) => {
    const { id_barang, jumlah } = req.body;
    const sql = 'INSERT INTO pembelian (id_barang, jumlah) VALUES (?, ?)';
    mysql.query(sql, [id_barang, jumlah], async (err, result) => {
        if (err) return res.status(500).send(err);
        try {
            await Log.create({
                message: `Pembelian barang ${id_barang} dengan jumlah ${jumlah} berhasil dilakukan`,
                timestamp: new Date()
            });
            res.json({ status: 'success' });
        } catch (error) {
            res.status(500).send(error);
        }
    });
});

app.get('/logs', async (req, res) => {
    try {
        const logs = await Log.find();
        res.send(logs);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
