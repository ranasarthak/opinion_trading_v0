"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const variables_1 = require("../variables");
const balanceRouter = express_1.default.Router();
balanceRouter.get("/:inr", (req, res) => {
    res.json(variables_1.INR_BALANCES);
});
balanceRouter.get("/:stock", (req, res) => {
    res.json(variables_1.STOCK_BALANCES);
});
balanceRouter.post("/onramp/inr", (req, res) => {
    const { userId, amount } = req.body;
    if (!variables_1.INR_BALANCES[userId]) {
        res.status(400).json({ error: "User not found" });
    }
    variables_1.INR_BALANCES[userId].balance += amount;
    res.json({ message: `Balance updated to: ${variables_1.INR_BALANCES[userId].balance}` });
});
balanceRouter.get("/stock/:userId", (req, res) => {
    const { userId } = req.params;
    if (!variables_1.STOCK_BALANCES[userId]) {
        res.status(400).json({ error: "User not found or has zero stocks" });
    }
    res.json(variables_1.STOCK_BALANCES[userId]);
});
balanceRouter.get("/inr/:userId", (req, res) => {
    const { userId } = req.params;
    if (!variables_1.INR_BALANCES[userId]) {
        res.status(400).json({ error: "User not found" });
    }
    res.json({ balance: variables_1.INR_BALANCES[userId].balance });
});
exports.default = balanceRouter;
