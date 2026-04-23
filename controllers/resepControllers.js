const db = require("../config/db");

const getResep = (req, res) => {
        db.query ("SELECT * FROM resep", (err, result) => {
            if (err) {
            res.status(500).json({error: err.message})
                return;
            } else {
                res.json(result);
            }
        })
}

const getResepByID = (req, res) => {
    const id = req.params.id;
    db.query ("SELECT * FROM resep WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.status(500).json({error: err.message})
            return;
        } else {
            res.json(result);
        }
    });
}

const addResep = (req, res) => {
    const { nama, deskripsi, kategori, tingkat_kesulitan, created_at } = req.body;
    db.query("INSERT INTO resep (nama, deskripsi, kategori, tingkat_kesulitan, created_at) VALUES (?, ?, ?, ?, ?)", [nama, deskripsi, kategori, tingkat_kesulitan, created_at], (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        } else {
            res.status(201).json({message: "Resep berhasil ditambahkan", id: result.insertId});
        }
    });
}

const deleteResep = (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM resep WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        } else {
            res.json({message: "Resep berhasil dihapus"});
        }
    });
}

const getAllBahan = (req, res) => {
    const resep_id = req.params.resep_id;
    db.query("SELECT * FROM bahan WHERE resep_id = ?", [resep_id], (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        } else {
            res.json(result);
        }
    });
}

const addBahan = (req, res) => {
    const resep_id = req.params.resep_id;
    const { nama_bahan, takaran } = req.body;
    db.query("INSERT INTO bahan (resep_id, nama_bahan, takaran) values (?, ?, ?)", [resep_id, nama_bahan, takaran], (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        } else {
            res.status(201).json({message: "Bahan berhasil ditambahkan"});
        }
    });
}

const getAllLangkah = (req, res) => {
    const resep_id = req.params.resep_id;
    db.query("SELECT * FROM langkah WHERE resep_id = ?", [resep_id], (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        } else {
            res.json(result);
        }
    });
}

const addLangkah = (req, res) => {
    const resep_id = req.params.resep_id;
    const { urutan, instruksi } = req.body;
    db.query("INSERT INTO langkah (resep_id, urutan, instruksi) VALUES (?,?,?)", [resep_id, urutan, instruksi], (err, result) => {
        if (err) {
            res.status(500).json({message: err.message});
            return;
        } else {
            res.json({message: "Langkah-Langkah berhasil ditambahkan"});
        }
    })
}



module.exports = {
    getResep,
    getResepByID,
    addResep,
    deleteResep, 
    getAllBahan,
    addBahan,
    getAllLangkah,
    addLangkah,
}