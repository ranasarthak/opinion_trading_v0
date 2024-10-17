import express from "express";
import { ORDERBOOK } from "../variables";
import { error } from "console";

const orderBookRouter = express.Router();

orderBookRouter.get("/", (req, res) => {
    res.json(ORDERBOOK);
})

orderBookRouter.get("/:stockSymbol", (req, res) => {
    const { stockSymbol } = req.params;

    if(!ORDERBOOK[stockSymbol]){
        res.status(400).json({error: "Symbol doesnot exist"});
    }
    res.json(ORDERBOOK[stockSymbol]);
});

export default orderBookRouter;