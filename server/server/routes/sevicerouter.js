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


router.post("/newservices", upload.single("images"), ServiceController.newService);


// dashboard
router.patch('/services/:id', ServiceController.updateServiceApproval);
router.get("/services", ServiceController.allServices);
// dashboard




router.get("/servicestrue", ServiceController.approvedServices); // New route

router.get("/services/:userId", ServiceController.AllservicesByUserId);

router.get("/services/:id", ServiceController.oneServiceById);

router.put("/services/:id", ServiceController.updateService);

router.delete("/services/:id", ServiceController.deleteService);




module.exports = router;
