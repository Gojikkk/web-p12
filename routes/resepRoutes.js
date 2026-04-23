const express = require("express");
const router = express.Router();
const {
 getResep, 
 getResepByID, 
 addResep, 
 deleteResep, 
 getAllBahan,
 addBahan,
 getAllLangkah,
 addLangkah,
} = require("../controllers/resepControllers");
const { validateBahan, validateLangkah } = require("../middleware/validateResep");

router.get("/resep", getResep);
router.get("/resep/:id", getResepByID);
router.post("/resep", addResep);
router.delete("/resep/:id", deleteResep);

router.get("/resep/:resep_id/bahan", getAllBahan);
router.post("/resep/:resep_id/bahan", validateBahan, addBahan); 

router.get("/resep/:resep_id/langkah", getAllLangkah);
router.post("/resep/:resep_id/langkah", validateLangkah, addLangkah);


module.exports = router;