const express = require("express");
const juiceNikotinController = require("../controllers/juiceNikotinController");

const router = express.Router();

router.get("/api/allJuiceNikotin", juiceNikotinController.allJuiceNikotin);
router.post("/api/addJuiceNikotin", juiceNikotinController.addJuiceNikotin);


module.exports = router;