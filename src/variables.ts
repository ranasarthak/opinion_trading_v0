export interface INRBalance {
    balance: number;
    locked: number;
}

export interface StockBalance {
    quantity: number;
    locked: number;
}

export interface Order {
    total: number;
    orders: { [userId: string]: number};
}

export interface OrderBook {
    [symbol: string] : {
        yes: { [price: number]: Order};
        no: { [price: number]: Order};
    };
}

export interface CounterOffer {
    id: string;
    userId: string;
    stockSymbol: string;
    type: 'yes' | 'no';
    quantity: number;
    price: number;
}

export const INR_BALANCES: { [userId : string] : INRBalance} = {};

export const ORDERBOOK: OrderBook = {};

export const STOCK_BALANCES: { [userId: string]: { [symbol: string] : { yes: StockBalance; no: StockBalance}}} = {};

export const COUNTER_OFFERS: CounterOffer[] = [];
