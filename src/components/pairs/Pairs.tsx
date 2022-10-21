import React, {useEffect} from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import {
    getPairs,
    selectPairs
} from "slices/pairs/pairsSlice";

import {
    selectSelectedPair,
    select
} from "slices/selectedPair/selectedPairSlice";

import {
    setPinned,
    getPinned
} from "slices/pinned/pinnedSlice";

import {
    getPairsHistorical,
} from "slices/pairHistoical/pairHistoricalSlice";

import styles from "components/pairs/Pairs.module.css";
import {IPair} from "api/dataTypes";
import {writeLocal} from "utils";
import Pair from "components/pair/Pair";

const Pairs = () => {
    const pinned:IPair[] = useAppSelector(getPinned);
    const pairs:IPair[] = useAppSelector(selectPairs);
    const selected:IPair | undefined = useAppSelector(selectSelectedPair);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPairs());
    }, [dispatch]);

    useEffect(() => {
        if(pairs.length && !selected) {
            dispatch(select(pairs[0]));
            writeLocal('pairs', pairs);
        }
    }, [pairs, dispatch, selected]);

    useEffect(() => {
        if(selected) {
            dispatch(getPairsHistorical(selected.name));
        }
    }, [selected, pairs, dispatch]);


    const pairsItems:JSX.Element[] | undefined = pairs?.map((item:IPair, index:number) => {
        const isSelected:boolean = item.name === selected?.name;
        const isPinned:boolean = !!pinned[index];
        const pinnedIndex:number = pinned.reduce((total, item, i) => {
            if(item && i < index) {
                return total + 1;
            }

            return total;
        }, 0);

        return (
            <Pair
                key={item.name}
                name={item.name}
                change24h={item.change24h}
                price={item.price}
                index={index}
                isSelected={isSelected}
                isPinned={isPinned}
                pinnedIndex={pinnedIndex}
            />);

    });
    const selectedName:string = (selected && pairs.length && selected?.name) || '';

    return (
        <section aria-label='symbols' className={styles.container}>
            <h2>{selectedName}</h2>
            <ul tabIndex={0} className={styles.pairs} onClick={(e) => {
                const target:HTMLElement = e.target as HTMLElement;
                const index:number = +(target.dataset.index || -1);

                if(target.dataset.itemType === 'pin') {
                    const ref:any = [...pinned];
                    if(ref[index]) {
                        ref[index] = undefined;
                    } else {
                        ref[index] =  pairs[index];
                    }

                    dispatch(setPinned(ref));

                } else {
                    dispatch(select(pairs[index]));
                }
            }}>
                {pairsItems}
            </ul>
        </section>
    );
}

export default Pairs;