"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const variables_1 = require("../variables");
const orderBookRouter = express_1.default.Router();
orderBookRouter.get("/", (req, res) => {
    res.json(variables_1.ORDERBOOK);
});
orderBookRouter.get("/:stockSymbol", (req, res) => {
    const { stockSymbol } = req.params;
    if (!variables_1.ORDERBOOK[stockSymbol]) {
        res.status(400).json({ error: "Symbol doesnot exist" });
    }
    res.json(variables_1.ORDERBOOK[stockSymbol]);
});
exports.default = orderBookRouter;
