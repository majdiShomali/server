const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const protected =require("../middleware/Protected")
const upload = require("../middleware/handleImage")
const checkRole = require("../middleware/CheckRole")

router.get("/api/testGet" ,checkRole, userController.testGet);
router.post("/api/testPost" ,checkRole, userController.testPost);

router.get("/api/userData" ,protected, userController.userData);
router.get("/api/users" , userController.allUsers);
router.get("/api/Providers", userController.allProviders);
router.get("/api/Admins", userController.allAdmins);
router.post("/api/users", userController.newUser);
router.put("/api/verifyEmail", userController.verifyEmail);
router.put("/api/verifyOldEmail", userController.verifyOldEmail);
router.post("/api/usersLogin", userController.newUserLogin);
router.get("/api/users/:id", userController.oneUser);
router.delete("/api/users/:id", userController.deleteUser);
router.put("/api/users/:id",upload.single("image"), userController.updateUser);

module.exports = router;