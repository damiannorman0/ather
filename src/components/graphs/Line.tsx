import {IPair, IPairHistoric} from "api/dataTypes";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};


const LineGraph = (props:any) => {
    const selected:IPair = props.selected;
    const data:IPairHistoric[] = props.data;
    const closeData:number[] = data.map((item:IPairHistoric) => {
        return +(item?.close || 0);
    });
    const labels: string [] = data.map((item:IPairHistoric) => {
        return new Date(item?.startTime || 0).toLocaleTimeString();
    });

    const chartData:any = {
        labels,
        datasets: [{
            label: `${selected?.name || ''} Last 24 hours close price`,
            data: closeData,
            borderColor: 'rgba(255, 05, 180, 0.5)',
            backgroundColor: 'rgba(255, 05, 180, 0.5)',
        }],
        tension: 0.1,
    };

    return (
        <>
            <Line data={chartData}></Line>
        </>
    );
}

export default LineGraph;