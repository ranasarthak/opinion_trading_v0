import express from "express";
import { ORDERBOOK } from "../variables";
import { error } from "console";

const symbolRouter = express.Router();

symbolRouter.post("/create/:symbol", (req, res) => {
    const { symbol } = req.params;

    if(ORDERBOOK[symbol]){
        res.status(400).json({error: "Symbol already exists"});
    }

    ORDERBOOK[symbol] = { yes: {}, no: {}};
    res.json({message: "Symbol created successfully"});
})

export default symbolRouter;