import React, {useState, useEffect} from 'react';

const Timer = ({time, timeIsOver, isTimerWorking}) => {
    let [timeLeft, setTime] = useState(null);
    let [isProcessed, setProcessed] = useState(false);
    const [isWorking, setIsWorking] = useState(isTimerWorking);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setIsWorking(isTimerWorking);
        if (isLoading) {
            setTime(time);
        }
        if (timeLeft) {
            setLoading(false);
        }
        if (!isLoading && !isProcessed) {
            setProcessed(true);
            let interval = setInterval(() => {
                console.log(`${isTimerWorking} ${timeLeft}`);
                if (timeLeft - 1 <= 0 || localStorage.getItem('timer-stop')) {
                    clearInterval(interval);
                    localStorage.removeItem('timer-stop');
                    if (timeLeft - 1 <= 0) {
                        timeIsOver();
                    }
                    return;
                }
                setTime(timeLeft--);
            }, 1000);
        }

    }, [time, timeLeft, isLoading, isTimerWorking]);

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