const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const upload = require("../middleware/handleImage")

router.post("/api/items",upload.single("image"), itemController.addItem);
router.get("/api/allItems", itemController.allItems);
router.get("/api/OneItem/:id", itemController.OneItem);
router.post("/api/allCartItems", itemController.allCartItems);
router.put("/api/updateItemFav/:id" , itemController.updateItemFav);
router.get("/api/favoriteItems/:id", itemController.favoriteItems);

  
module.exports = router;