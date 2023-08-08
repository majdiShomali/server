const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const upload = require("../middleware/handleImage")

router.get("/api/allItems", itemController.allItems);
router.get("/api/OneItem/:id", itemController.OneItem);
router.get("/api/favoriteItems/:id", itemController.favoriteItems);
router.get("/api/ProviderItems/:id", itemController.ProviderItems);

router.post("/api/items",upload.single("image"), itemController.addItem);
router.post("/api/allCartItems", itemController.allCartItems);
router.put("/api/updateItemFav/:id" , itemController.updateItemFav);
router.put("/api/updateProductRate/:id", upload.single("image"), itemController.updateProductRate);
router.put("/api/updateProductQuantity/:id", itemController.updateProductQuantity);

  
module.exports = router;