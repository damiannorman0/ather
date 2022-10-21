import React, {useEffect, useMemo, useState} from 'react';
import logo from 'logo.svg';
import 'App.css';
import Pairs from "components/pairs/Pairs";
import Graphs from "components/graphs/Graphs";
import {useAppDispatch, useAppSelector} from "store/hooks";
import {updatePairs} from "slices/pairs/pairsSlice";
import {IPair, IPairUpdate} from "api/dataTypes";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {getPinned} from "slices/pinned/pinnedSlice";
import BuySell from "./components/buySell/BuySell";


function App() {
    const dispatch = useAppDispatch();
    const [socketUrl] = useState('wss://ftx.com/ws/');
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        shouldReconnect: (event) => true
    });
    const connection = useMemo(() => {
        return {
            [ReadyState.CONNECTING]: 'Connecting',
            [ReadyState.OPEN]: 'Open',
            [ReadyState.CLOSING]: 'Closing',
            [ReadyState.CLOSED]: 'Closed',
            [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
        }
    }, []);
    const connectionStatus = connection[readyState];
    const pinned:IPair[] = useAppSelector(getPinned);

    useEffect(() => {
        if(connectionStatus === connection[ReadyState.OPEN]) {
            const last:IPair = pinned[pinned.length - 1];
            if(last) {
                const request = JSON.stringify({
                    op: "subscribe",
                    channel: "ticker",
                    market: last.name,
                });
                sendMessage(request);
            }
        }

    }, [connectionStatus, connection, sendMessage, pinned]);

    useEffect(() => {
        const parsed: any = (lastMessage && JSON.parse(lastMessage.data)) || {};
        switch (parsed?.type) {
            case "subscribed":
                console.log('!subscribed!', parsed);
                break;
            case "update":
                const  latest = {
                    [parsed.market]:{
                        name: parsed?.market,
                        price: parsed?.data?.ask
                    } as IPairUpdate
                };

                dispatch(updatePairs(latest));
                break;
        }
    }, [lastMessage, dispatch]);

    return (
        <div className="App">
            <header>
                <h1>ather</h1>
                <div><p>WS {connectionStatus}</p></div>
            </header>
            <main>
                <Pairs />
                <Graphs />
                <BuySell />
            </main>
        </div>
  );
}

export default App;
