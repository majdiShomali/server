const express = require("express");
const juiceSizeController = require("../controllers/juiceSizeController");

const router = express.Router();

router.get("/api/allJuiceSize", juiceSizeController.allJuiceSize);
router.post("/api/addJuiceSize", juiceSizeController.addJuiceSize);


module.exports = router;