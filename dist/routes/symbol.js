"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const variables_1 = require("../variables");
const symbolRouter = express_1.default.Router();
symbolRouter.post("/create/:symbol", (req, res) => {
    const { symbol } = req.params;
    if (variables_1.ORDERBOOK[symbol]) {
        res.status(400).json({ error: "Symbol already exists" });
    }
    variables_1.ORDERBOOK[symbol] = { yes: {}, no: {} };
    res.json({ message: "Symbol created successfully" });
});
exports.default = symbolRouter;
