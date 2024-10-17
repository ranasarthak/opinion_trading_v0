"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const variables_1 = require("../variables");
const router = express_1.default.Router();
router.post("/mint", (req, res) => {
    const { userId, stockSymbol, quantity } = req.body;
    if (!variables_1.INR_BALANCES[userId]) {
        res.status(400).json({ error: "User not found" });
    }
    if (!variables_1.ORDERBOOK[stockSymbol]) {
        res.status(400).json({ error: "Stocksymbol not found" });
    }
    const totalCost = quantity * 1000;
    if (variables_1.INR_BALANCES[userId].balance < totalCost) {
        res.status(400).json({ error: "Insufficient balance" });
    }
    variables_1.INR_BALANCES[userId].balance -= totalCost;
});
