import express from "express";
import { v4 as uuidv4 } from 'uuid';
import { COUNTER_OFFERS, INR_BALANCES, ORDERBOOK, STOCK_BALANCES } from "../variables";
import { error } from "console";

const orderRouter = express.Router();

const createCounterOffer = (
    userId: string,
    stockSymbol: string,
    type: 'yes' | 'no',
    quantity: number,
    price: number
) => {
    
    type = type === 'yes' ? 'no' : 'yes';
    const counterType = type;
    const counterPrice = 1000 - price;
    
    const counterOffer = {
        id: uuidv4(),
        userId,
        stockSymbol,
        type: counterType,
        quantity,
        price: counterPrice
    }

    COUNTER_OFFERS.push(counterOffer);

    addToOrderbook(counterOffer);

    return counterOffer;
}

const addToOrderbook = (order : { id: string; userId: string; stockSymbol: string; type: 'yes' | 'no'; quantity: number; price: number }) => {
    const { userId, stockSymbol, type, price, quantity } = order;

    if(!ORDERBOOK[stockSymbol]) {
        ORDERBOOK[stockSymbol] = { yes: {}, no: {} }
    }    
    if(!ORDERBOOK[stockSymbol][type][price]){
        ORDERBOOK[stockSymbol][type][price] = { total: 0, orders: {} };
    }

    ORDERBOOK[stockSymbol][type][price].total += quantity;
    ORDERBOOK[stockSymbol][type][price].orders[userId] = 
    (ORDERBOOK[stockSymbol][type][price].orders[userId] || 0) + quantity;
}

const placeOrder = (type: 'yes' | 'no', side: 'buy'| 'sell' , req: express.Request, res: express.Response) => {
    const { userId, stockSymbol, quantity, price } = req.body;
    const priceInPaise = price * 100;

    if(!INR_BALANCES[userId]){
        return res.status(404).json({ error: "User not found" });
    }

    if(!ORDERBOOK[stockSymbol]){
        if(userId === 'admin'){
            ORDERBOOK[stockSymbol] = { yes: {}, no: {} };
            return;
        }
        return res.status(401).json({ error: "Unauthorised Access "});
    }

    const totalStocksAvailable = Object.values(STOCK_BALANCES).reduce((total, userBalance)=> {
        return total + (userBalance[stockSymbol]?.[type]?.quantity || 0);
    }, 0);

    let counterOffer = 0;
    if(totalStocksAvailable === 0 && side === 'buy'){
        
    }

    if(side === 'buy' ){
        const totalCost = quantity * priceInPaise;
        if(totalCost > INR_BALANCES[userId].balance){
            res.status(400).json({ error: "Insufficient balance" });
        }
        INR_BALANCES[userId].balance -= totalCost;
        INR_BALANCES[userId].locked += totalCost;
    }
    else{
        if(!STOCK_BALANCES[userId] ||
        !STOCK_BALANCES[userId][stockSymbol] ||
        !STOCK_BALANCES[userId][stockSymbol][type]||
        STOCK_BALANCES[userId][stockSymbol][type].quantity < quantity){
            res.status(400).json({ error: "Insufficient stock balance" });
        }
        STOCK_BALANCES[userId][stockSymbol][type].quantity -= quantity;
        STOCK_BALANCES[userId][stockSymbol][type].locked += quantity;
    }
}

orderRouter.post("/buy/yes", (req, res) =>  { placeOrder('yes', 'buy', req, res) });
orderRouter.post('/buy/no', (req, res) => { placeOrder('no', 'buy', req, res) });
orderRouter.post("/sell/yes", (req, res) =>  { placeOrder('yes', 'sell', req, res) });
orderRouter.post('/sell/no', (req, res) => { placeOrder('no', 'sell', req, res) });

export default orderRouter;