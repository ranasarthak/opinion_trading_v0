import express from "express";
import { INR_BALANCES, STOCK_BALANCES } from "../variables";
import { error } from "console";

const balanceRouter = express.Router();

balanceRouter.get("/:inr", (req, res) => {
    res.json(INR_BALANCES);
})

balanceRouter.get("/:stock", (req, res) => {
    res.json(STOCK_BALANCES);
})

balanceRouter.post("/onramp/inr", (req, res) => {
    const {userId, amount} = req.body;

    if(!INR_BALANCES[userId]){
        res.status(400).json({error: "User not found"});
    }

    INR_BALANCES[userId].balance += amount;

    res.json({message: `Balance updated to: ${INR_BALANCES[userId].balance}`});
})

balanceRouter.get("/stock/:userId", (req, res) => {
    const { userId } = req.params;

    if(!STOCK_BALANCES[userId]){
        res.status(400).json({error: "User not found or has zero stocks"});
    }
    res.json(STOCK_BALANCES[userId]);
})

balanceRouter.get("/inr/:userId", (req, res) => {
    const { userId } = req.params;
    if(!INR_BALANCES[userId]){
        res.status(400).json({error: "User not found"});
    }

    res.json({balance: INR_BALANCES[userId].balance});
});

export default balanceRouter;