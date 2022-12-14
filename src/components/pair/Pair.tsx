import React from "react";
import styles from "components/pair/Pair.module.css";


export interface IPairProps {
    name:string,
    price:number,
    index:number,
    change24h:number,
    isSelected: boolean,
    isPinned:boolean,
    pinnedIndex:number,
}

const Pair = (props:IPairProps) => {
    const selectedClassName:any = (props.isSelected && styles.selected) || '';
    const pinnedClassName:any = (props.isPinned && styles.pinned) || '';
    const pinnedTopVal:number = 60 * props.pinnedIndex;
    const pinnedIndexStyle:any = (props.isPinned && {
        top: `${pinnedTopVal}px`
    }) || {};
    const unpinClassName:any = (props.isPinned && styles.pinUnpinned) || '';

    let liveSVG;
    if(props.isPinned) {
        liveSVG = <div className={styles.pinLive} data-index={props.index} tabIndex={0} aria-label={"live"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-broadcast" viewBox="0 0 16 16">
                <path
                    d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
            </svg>
        </div>;
    }

    return (
        <li  tabIndex={0}
             aria-label={props.name}
             data-name={props.name}
             data-index={props.index}
             data-item-type='pair'
             className={`${styles.pair} ${pinnedClassName} ${selectedClassName} `}
             style={pinnedIndexStyle}>
            {props.name} - PRICE:{props.price}
            {liveSVG}
            <div className={`${styles.pin} ${unpinClassName}`} data-index={props.index} data-item-type='pin' tabIndex={0} aria-label={"pin"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin"
                     viewBox="0 0 16 16">
                    <path
                        d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z"/>
                </svg>
            </div>
        </li>
    );
}

export default Pair;