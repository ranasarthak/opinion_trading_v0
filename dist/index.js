"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const balance_1 = __importDefault(require("./routes/balance"));
const orderbook_1 = __importDefault(require("./routes/orderbook"));
const order_1 = __importDefault(require("./routes/order"));
const symbol_1 = __importDefault(require("./routes/symbol"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/user', user_1.default);
app.use('/balance', balance_1.default);
app.use('/orderbook', orderbook_1.default);
app.use('/order', order_1.default);
app.use('/symbol', symbol_1.default);
// app.use('/user',);
// app.use('/',);
// app.use('',);
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});
