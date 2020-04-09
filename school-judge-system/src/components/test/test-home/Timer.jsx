import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

const Timer = ({time, timeIsOver, isTimerWorking}) => {
    let [timeLeft, setTime] = useState(null);
    let [isProcessed, setProcessed] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setTime(time);
        }
        if (timeLeft) {
            setLoading(false);
        }
        if (!isLoading && !isProcessed) {
            setProcessed(true);
            let interval = setInterval(() => {
                if (timeLeft - 1 <= 0) {
                    clearInterval(interval);
                    timeIsOver();
                }
                if (!isTimerWorking) {
                    clearInterval(interval);
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
const mapStateToProps = (state) => ({
    isTimerWorking: state.test.isTimerWorking
});

export default connect(mapStateToProps, null)(Timer);