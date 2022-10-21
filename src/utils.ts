// var forge = require('node-forge');
//
// export const getHeaders = (requestMethod: string = 'GET', url:string = ''): any => {
//         const ms:number = new Date(Date.now()).getTime();
//         const signaturePayload:string = encodeURIComponent(`${ms}${requestMethod}${url}`);
//         const md = forge.md.sha256.create();
//         md.update(encodeURIComponent(`${process.env.REACT_APP_SECRET}`), signaturePayload);
//         const hex = md.digest().toHex();
//         const signature:string = hex;
//
//         //const signature:string = hmac.new(encodeURIComponent(`${process.env.REACT_APP_SECRET}`), signaturePayload, 'sha256').hexdigest();
//
//         return {
//             'FTXUS-KEY': `${process.env.REACT_APP_KEY}`,
//             'FTXUS-TS': `${ms}`,
//             'FTXUS-SIGN': signature
//         }
// };

export const getBaseURL = (): string => {
    return '/api';
}

export const writeLocal = (key:string, val:any) => {
    localStorage.setItem(key, JSON.stringify(val));
}

export const getUnixDateTime = (time:number): number => {
    return new Date(time).getTime() / 1000|0;
}