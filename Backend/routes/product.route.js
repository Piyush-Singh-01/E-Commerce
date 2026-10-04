const express = require("express");

const upload = require("../middleware/multer");

const { getAllProduct, getSingleProduct, deleteProduct, createProduct, updateProduct, udpateProductStock, getAllInventoryHistory, deleteInventoryHistory} = require("../controllers/product.controller");

const router = express.Router();

const protect = require("../middleware/protect");
const adminOnly = require("../middleware/admin");

router.get("/", getAllProduct);

router.get("/:id", getSingleProduct);

router.get("/stock-history/:id", protect, adminOnly, getAllInventoryHistory);

router.post("/create", protect, adminOnly, upload.array("images", 6), createProduct);

router.put("/update/:id", protect, adminOnly, upload.array("images", 6), updateProduct);

router.patch("/update-stock/:id", protect, adminOnly, udpateProductStock);

router.delete("/delete/:id", protect, adminOnly, deleteProduct);

router.delete("/delete-history/:id", protect, adminOnly, deleteInventoryHistory);


module.exports = router;