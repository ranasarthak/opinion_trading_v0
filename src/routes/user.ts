import express from "express";
import { INR_BALANCES } from "../variables";
import { error } from "console";

const userRouter = express.Router();

userRouter.post("/create/:userId", (req, res) => {
    const { userId } = req.params;
    if(INR_BALANCES[userId]){
        res.status(400).json({error: "User already exists"});
    }

    INR_BALANCES[userId] = {balance: 0, locked: 0};
    res.json({message: "User created successfully", userId});
})



export default userRouter;