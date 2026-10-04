const mongoose = require("mongoose");

const inventoryHistorySchema = new mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    operation: {
        type: String,
        enum: ["Added", "Removed"],
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    previousStock:{
        type: Number,
        required: true
    },

    newStock:{
        type: Number,
        required: true
    },

    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    }
}, {timestamps: true});

const InventoryHistory = mongoose.model("InventoryHistory", inventoryHistorySchema);

module.exports = InventoryHistory;