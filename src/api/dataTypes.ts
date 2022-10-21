export interface IPair {
    name:string,
    baseCurrency?:string,
    quoteCurrency?:string,
    quoteVolume24h?: number,
    change1h?: number,
    change24h: number,
    changeBod?: number,
    highLeverageFeeExempt?: boolean,
    minProvideSize?: number,
    type?: string,
    underlying?: string,
    enabled?: boolean,
    ask?: number,
    bid?: number,
    last?: number,
    postOnly?: boolean,
    price: number,
    priceIncrement?: number,
    sizeIncrement?: number,
    restricted?: boolean,
    volumeUsd24h?: number,
    largeOrderThreshold?: number,
    isEtfMarket?: false,
}

export interface  IPairHistoric {
    close?:number,
    high?:number,
    low?:number,
    open?:number
    startTime?:string,
    time?: number,
    volume?:number
}

export interface  IPairUpdate {
    price: number,
    name:string,
}

export interface ITrade {
    type: string,
    price: number,
    name: string,
}