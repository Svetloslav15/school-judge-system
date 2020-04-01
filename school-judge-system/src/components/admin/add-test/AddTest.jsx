import React, {useState, useEffect} from 'react';
import StepOneForm from './StepOneForm';
import StepTwoForm from './StepTwoForm';
import StepThreeForm from './StepThreeForm';

const AddTest = (props) => {
    const [step, setStep] = useState(1);
    const [stepOneDone, setStepOneDone] = useState(false);
    const [stepTwoDone, setStepTwoDone] = useState(false);
    const [stepThreeDone, setStepThreeDone] = useState(false);


    //test: {name, password, timeInMinutes, pointsForPoor, pointsForSatisfactory,
    // pointsForGood, pointsForVeryGood, pointsForExcellent }
    const [test, setTest] = useState();

    const handleStepOneForm = (name, password, time) => {
        setStepOneDone(true);
        setStep(2);
        setTest({...test, name, password, time});
    };

    const handleStepTwoForm = (questions) => {
        setStepTwoDone(true);
        setStep(3);
        setTest({...test, questions});
    };

    const handleStepThreeForm = ({pointsForPoor, pointsForSatisfactory, pointsForGood,
                                     pointsForVeryGood, pointsForExcellent}) => {
        setTest({...test, pointsForPoor, pointsForSatisfactory, pointsForGood,
            pointsForVeryGood, pointsForExcellent});
        setStepThreeDone(true);
        setStep(1);
    };

    useEffect(() => {
        console.log(test);
    }, [test]);

    return (
        <div className='jumbotron col-md-11 mx-auto my-3'>
            <h3 className='text-center my-0'>Добави тест</h3>
            <div className="row my-0">
                <div className="col-md-12">
                    <ul className="stepper stepper-horizontal my-0">
                        <li className={stepOneDone ? '' : step === 1 ? 'active' : 'warning'}
                            onClick={() => setStep(1)}>
                            <a href="#">
                                <span className="circle">1</span>
                                <span className="label">Име и парола</span>
                            </a>
                        </li>
                        <li className={stepTwoDone ? '' : step === 2 ? 'active' : 'warning'}
                            onClick={() => setStep(2)}>
                            <a href="#">
                                <span className="circle">2</span>
                                <span className="label">Въпроси</span>
                            </a>
                        </li>
                        <li className={stepThreeDone ? '' : step === 3 ? 'active' : 'warning'}
                            onClick={() => setStep(3)}>
                            <a href="#">
                                <span className="circle">3</span>
                                <span className="label">Завърши теста</span>
                            </a>
                        </li>

                    </ul>
                    {step === 1 && <StepOneForm handleStepOneForm={handleStepOneForm}/>}
                    {step === 2 && <StepTwoForm handleStepTwoForm={handleStepTwoForm}/>}
                    {step === 3 && <StepThreeForm handleStepThreeForm={handleStepThreeForm}/>}
                </div>
            </div>
        </div>
    )
};

export default AddTest;