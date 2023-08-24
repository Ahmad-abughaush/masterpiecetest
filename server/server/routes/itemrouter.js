const express = require("express");
const router = express.Router();
const itemController = require("../controller/itemcontroller");
const auth = require('../middleware/verIfyJWT')
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Check the file type and set the destination directory accordingly
        if (file.fieldname === "images") {
            cb(null, "images");
        } else {
            cb(new Error("Invalid fieldname"));
        }
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

router.post("/newitems",upload.single("images"),itemController.newItem
);


router.get("/itemsapproved", itemController.allItemsapproved);

router.get('/items/:userId', itemController.getAllItemsByUserId);

router.get("/items/:id", itemController.oneItemById);

router.put("/items/:id",  itemController.updateItem);

router.delete("/items/:id", itemController.deleteItem);



// dashboard
router.patch('/items/:id', itemController.updateProductApprovalStatus);

router.get("/items", itemController.allItems);

// dashboard
module.exports = router;

