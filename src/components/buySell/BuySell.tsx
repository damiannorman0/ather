import {useAppDispatch, useAppSelector} from "store/hooks";
import {selectSelectedPair} from "slices/selectedPair/selectedPairSlice";
import {IPair, ITrade} from "api/dataTypes";
import styles from "components/buySell/BuySell.module.css";
import {setBuySell, getBuySell, BUY, SELL} from "slices/buySell/buySellSlice";
import {ChangeEvent, useRef, useState} from "react";


const BuySell = () => {
    const selected:IPair | undefined = useAppSelector(selectSelectedPair);
    const buySells:ITrade[] = useAppSelector(getBuySell);
    const dispatch = useAppDispatch();
    const priceRef:any = useRef();
    const [tradeType, setTradeType] = useState('buy');

    const tradeTypeChange = (e:ChangeEvent) => {
        const element:HTMLFormElement = e.target as HTMLFormElement;
        setTradeType(element.value);
    };

    const tradeItems:JSX.Element[] = buySells.map((item:ITrade, index:number) => {
        return (
                <li key={index}>
                    {item.type} {item.name} ${item.price}
                </li>
        );
    });

    return (
        <section className={styles.container}>
            <div className={styles.trades}>
                <h2>Latest Trades</h2>
                <ul>
                    {tradeItems}
                </ul>
            </div>
            <form className={styles.createTrade} tabIndex={0} aria-label={"bur or sell"} onSubmit={(e) => {
                e.preventDefault();
            }}>
                <h2>Trade {selected?.name}</h2>
                <fieldset>
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" tabIndex={0} min={1} ref={priceRef} aria-label={"price"} />
                </fieldset>
                <fieldset>
                    <legend>Enter a price for buy/sell</legend>
                    <label htmlFor="selBuy">Buy</label>
                    <input type="radio"
                           id="buy"
                           name="trade"
                           value={BUY}
                           tabIndex={0}
                           checked={tradeType === "buy"}
                           onChange={tradeTypeChange}
                           aria-label={"buy"}/>
                    <label htmlFor="selBuy">Sell</label>
                    <input type="radio"
                           id="sell"
                           name="trade"
                           value={SELL}
                           tabIndex={0}
                           checked={tradeType === "sell"}
                           onChange={tradeTypeChange}
                           aria-label={"sell"}/>
                </fieldset>
                <button tabIndex={0} aria-label={"execute"} onClick={() => {
                    const priceElement:any =  priceRef.current as any;
                    const currentTrade:ITrade = {
                        name: selected?.name,
                        price: +priceElement.value,
                        type: tradeType,
                    } as ITrade;

                    dispatch(setBuySell(currentTrade));

                }}>Execute</button>
            </form>
        </section>
    );
};


export default BuySell;