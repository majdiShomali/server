const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const upload = require("../middleware/handleImage")

router.get("/api/allItems", itemController.allItems);
router.get("/api/OneItem/:id", itemController.OneItem);
router.get("/api/ProviderItems/:id", itemController.ProviderItems);

router.post("/api/items",upload.single("image"), itemController.addItem);

router.put("/api/updateProductQuantity/:id", itemController.updateProductQuantity);

router.put("/api/updateProductColor/:id",upload.single("image"), itemController.updateProductColor);
router.put("/api/updateProductSize/:id",upload.single("image"), itemController.updateProductSize);
router.put("/api/updateProductVapePuff/:id",upload.single("image"), itemController.updateProductVapePuff);
router.put("/api/updateProductAccessory/:id",upload.single("image"), itemController.updateProductAccessory);

module.exports = router;