import React, {useState, useEffect} from 'react';

const Timer = ({time, timeIsOver}) => {
    let [timeLeft, setTime] = useState(time);
    const [interval, setIntervalSetter] = useState(null);
    let [isProcessed, setProcessed] = useState(false);

    useEffect(() => {
        timeLeft = time;
        setTime(time);
        if (!isProcessed) {
            setProcessed(true);
            setInterval(() => {
                if (timeLeft - 1 <= 0) {
                    clearInterval(interval);
                    timeIsOver();
                }
                console.log(timeLeft);
                setTime(timeLeft--);
            }, 1000);
        }

    }, [time]);

    return (
        <div className='col-md-5 py-4 text-right'>
            <p className='text-20'>Оставащо време:
                <span
                    className='text-25 font-weight-bold ml-3'>
                        {parseInt(parseInt(timeLeft / 60) % 60) < 10 ? `0${parseInt(parseInt(timeLeft / 60) % 60)}` : parseInt(parseInt(timeLeft / 60) % 60)}
                    :
                    {parseInt(timeLeft) % 60 < 10 ? `0${parseInt(timeLeft) % 60}` : parseInt(timeLeft) % 60}</span>
            </p>
        </div>
    );
};

export default Timer;