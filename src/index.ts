import express from "express";
import userRouter from "./routes/user";
import balanceRouter from "./routes/balance";
import orderBookRouter from "./routes/orderbook";
import orderRouter from "./routes/order";
import symbolRouter from "./routes/symbol";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/user', userRouter);
app.use('/balance', balanceRouter);
app.use('/orderbook', orderBookRouter);
app.use('/order', orderRouter);
app.use('/symbol', symbolRouter);
app.use('/user', );
app.use('/',);
app.use('/',);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});
 