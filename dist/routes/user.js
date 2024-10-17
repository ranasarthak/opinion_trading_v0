"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const variables_1 = require("../variables");
const userRouter = express_1.default.Router();
userRouter.post("/create/:userId", (req, res) => {
    const { userId } = req.params;
    if (variables_1.INR_BALANCES[userId]) {
        res.status(400).json({ error: "User already exists" });
    }
    variables_1.INR_BALANCES[userId] = { balance: 0, locked: 0 };
    res.json({ message: "User created successfully", userId });
});
exports.default = userRouter;
