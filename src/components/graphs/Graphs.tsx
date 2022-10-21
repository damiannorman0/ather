import LineGraph from "components/graphs/Line";
import {IPair, IPairHistoric} from "api/dataTypes";
import {useAppSelector} from "store/hooks";
import {selectPairHistorical} from "slices/pairHistoical/pairHistoricalSlice";
import React from "react";
import styles from "components/graphs/Graphs.module.css";
import {selectSelectedPair} from "slices/selectedPair/selectedPairSlice";

const Graphs = () => {
    const historic:IPairHistoric[] = useAppSelector(selectPairHistorical);
    const selected:IPair | undefined = useAppSelector(selectSelectedPair);

    return (
        <section className={styles.container}>
            <LineGraph selected={selected} data={historic} />
        </section>
    )
}

export default Graphs;