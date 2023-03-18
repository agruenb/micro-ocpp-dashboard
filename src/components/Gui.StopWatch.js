import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

export default function StopWatch(props){

    const [startTime, setStartTime] = useState(undefined);
    const [stopTime, setStopTime] = useState(undefined);
    const [timeString, setTimeString] = useState("");

    function updateCurrentTimeString(){
        if(!startTime){
            setTimeString("0.000");
            return;
        }
        let stopDate = stopTime || Date.now();
        let diffMillies = stopDate - startTime.valueOf() ;
        let fullSecs = Math.floor(diffMillies/1000);
        let newTimeString = `${fullSecs}.${diffMillies%1000} sec`;
        setTimeString(newTimeString);
    }

    useEffect(
        ()=>{
            if(startTime !== props.startTime){
                setStartTime(props.startTime);
            }
            if(stopTime !== props.stopTime){
                setStopTime(props.stopTime);
            }
        },
        [props.startTime, props.stopTime]
    )

    useEffect(
        () => {
            let interval = setInterval(()=>{
                setTimeString("");
                //stop updating timer if it is expired
                if(!props.startTime || props.stopTime && Date.now() - props.stopTime.valueOf() > 1000){
                    clearInterval(interval);
                }
            }, 17 );
            return ()=>{
                clearInterval(interval);
            }
        },
        [props.startTime, props.stopTime]
    );

    updateCurrentTimeString()

    return <span>
        {timeString}
    </span>
}