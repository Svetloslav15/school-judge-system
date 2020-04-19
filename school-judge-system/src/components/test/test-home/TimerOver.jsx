import React from 'react';
import {Link} from 'react-router-dom';

const TimerOver = () => (
    <div className="col-md-10 mx-auto sm-mx-2 bg-white my-4 text-center p-4 box-shadow">
        <div className="col-md-12">
            <i className="far fa-times-circle text-danger mx-auto my-3 f-size-15em"/>
        </div>
        <h2 className="my-4">Времето Ви свърши, въпросите на които успяхте да отговорите ще бъдат зачетени.
        </h2>
        <div className="col-md-12">
            <Link to='/'>
                <button className="btn btn-info mx-auto">Към началото</button>
            </Link>
        </div>
    </div>
);

export default TimerOver;