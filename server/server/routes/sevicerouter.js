const express = require("express");
const router = express.Router();
const ServiceController = require("../controller/servicecontroller");
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


router.post("/newservices",upload.single("images"), ServiceController.newService);

router.get("/services", ServiceController.allServices);

router.get("/services/:id", ServiceController.oneServiceById);

router.put("/services/:id", auth, ServiceController.updateService);

router.delete("/services/:id", auth, ServiceController.deleteService);

module.exports = router;
