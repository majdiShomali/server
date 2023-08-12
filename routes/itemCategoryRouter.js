const express = require("express");
const router = express.Router();
const itemCategoryController = require("../controllers/itemCategoryController");
const upload = require("../middleware/handleImage")

router.get("/api/allItems", itemCategoryController.allItems);
router.get("/api/OneItem/:id", itemCategoryController.OneItem);
router.get("/api/ProviderItems/:id", itemCategoryController.ProviderItems);

router.post("/api/items",upload.single("image"), itemCategoryController.addItem);


// router.put("/api/updateProductColor/:id",upload.single("image"), itemCategoryController.updateProductColor);
// router.put("/api/updateProductSize/:id",upload.single("image"), itemCategoryController.updateProductSize);
// router.put("/api/updateProductVapePuff/:id",upload.single("image"), itemCategoryController.updateProductVapePuff);
// router.put("/api/updateProductAccessory/:id",upload.single("image"), itemCategoryController.updateProductAccessory);

module.exports = router;