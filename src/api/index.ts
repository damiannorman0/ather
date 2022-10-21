import {IPair, IPairHistoric} from "api/dataTypes";
import {getBaseURL, getUnixDateTime} from "utils";

const key:string | undefined = process.env.REACT_APP_KEY;
const secret:string | undefined = process.env.REACT_APP_SECRET;
const hrPeriodAsSeconds:number = 60 * 60;
const periodAsSeconds:number = 24 * 60 * 60;




/**
 * @description get markets and filter by BTC type
 * ie https://ftx.com/api/markets?size=5
 */
export async function fetchPairs() {
    return new Promise((resolve, reject) => {
        const url:string = `${getBaseURL()}/markets`;
            fetch(url).then((response) => {
                return response.json();

            }).then((json) => {
                const btc: IPair[] = [...json.result].filter((item) => {
                    return item.quoteCurrency === 'BTC';
                });
                resolve(btc);

            }).catch((error) => {
                reject(error);
            });
    });
}

/**
 * @description use market/symbol name and get last 24 hrs data
 * @param name
 * @param start
 * ie https://ftx.com/api/markets/1INCH-PERP/candles?resolution=3600&start_time=1609462800
 */
export async function fetchPairHistorical(name:string = '') {
    const now:number = new Date(Date.now()).getTime();
    const minus24Hours:number = now - (periodAsSeconds * 1000);
    const startTime:number = new Date(minus24Hours).getTime();
    const unixStartTime:number = getUnixDateTime(startTime);

    return new Promise((resolve, reject) => {
        if(!name) {
            return reject(new Error('No market selected!'));
        }

        const url:string = `${getBaseURL()}/markets/${name}/candles?resolution=${hrPeriodAsSeconds}&start_time=${unixStartTime}`;
        fetch(url).then((response) => {
            return response.json();

        }).then((json) => {
            const historic: IPairHistoric[] = [...json.result];
            resolve(historic);

        }).catch((error) => {
            reject(error);
        });
    });
}