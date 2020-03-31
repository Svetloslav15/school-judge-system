import React from 'react';

const AddTest = () => {
    return (
        <div className='jumbotron col-md-11 mx-auto mt-3'>
            <h3 className='text-center'>Добави тест</h3>
            <div className="row">
                <div className="col-md-12">
                    <ul className="stepper stepper-horizontal">
                        <li className="">
                            <a href="#">
                                <span className="circle">1</span>
                                <span className="label">Име и парола</span>
                            </a>
                        </li>
                        <li className="active">
                            <a href="#">
                                <span className="circle">2</span>
                                <span className="label">Въпроси</span>
                            </a>
                        </li>
                        <li className="warning">
                            <a href="#">
                                <span className="circle">3</span>
                                <span className="label">Завърши теста</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
};

export default AddTest;