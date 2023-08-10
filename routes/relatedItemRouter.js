const express = require("express");
const router = express.Router();
const relatedItemsController = require("../controllers/relatedItemsController");
// const protected =require("../middleware/Protected")
const upload = require("../middleware/handleImage")


router.post("/api/allCartItems", relatedItemsController.allCartItems);
router.get("/api/RelatedItemsAll", relatedItemsController.RelatedItemsAll);
router.post("/api/addRelatedItem",upload.single("image"), relatedItemsController.addRelatedItem);
router.get("/api/allRelatedItems/:id", relatedItemsController.allRelatedItems);
router.get("/api/OneRelatedItem/:id", relatedItemsController.OneRelatedItem);
router.put("/api/updateItemFav/:id" , relatedItemsController.updateItemFav);
router.get("/api/favoriteItems/:id", relatedItemsController.favoriteItems);
router.put("/api/updateProductRate/:id", upload.single("image"), relatedItemsController.updateProductRate);
// router.delete("/api/users/:id", relatedItemsController.deleteUser);
// router.put("/api/users/:id",upload.single("image"), relatedItemsController.updateUser);

module.exports = router;