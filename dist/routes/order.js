"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const variables_1 = require("../variables");
const orderRouter = express_1.default.Router();
const placeOrder = (type, side, req, res) => {
    const { userId, stockSymbol, quantity, price } = req.body;
    const priceInPaise = price * 100;
    if (!variables_1.INR_BALANCES[userId]) {
        return res.status(404).json({ error: "User not found" });
    }
    if (!variables_1.ORDERBOOK[stockSymbol]) {
        return res.status(404).json({ error: "Stocksymbol not found" });
    }
};
exports.default = orderRouter;
