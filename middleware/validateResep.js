const validateBahan = (req, res, next) => {
    const { nama_bahan, takaran } = req.body;

    if (!nama_bahan || !takaran) {
        return res.status(400).json({ 
            message: "Nama bahan dan takaran wajib diisi!" 
        });
    }

    next();
};

const validateLangkah = (req, res, next) => {
    const { instruksi } = req.body;

    if (!instruksi) {
        return res.status(400).json({ 
            message: "Instruksi langkah wajib diisi!" 
        });
    }

    next();
};
module.exports = { validateBahan, validateLangkah };