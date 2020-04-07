import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import testService from '../../services/test-service';

const StartTestModal = ({children, id, history}) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [test, setTest] = useState(null);
    const [isClosed, setClosed] = useState(false);

    useEffect(() => {
        testService.getTestById(id)
            .then((data) => {
                setTest(data);
            })
    }, []);

    const startTest = () => {
        if (test) {
            if (test.password === password) {
                setError('');
                setClosed(true);
                history.push('/test/home/' + id);
                return;
            }
            setPassword('');
            setError('Грешна парола');
        }
    };

    return (
        <div>
            <div data-toggle="modal" data-target={"#basicExampleModal" + id}>
                {children}
            </div>
            <div className={!isClosed ? "modal fade" : 'modal fade d-none'} id={"basicExampleModal" + id} role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center">Започни теста</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5 className='text-warning font-weight-bold h5'>Внимание!</h5>
                            <p className='font-weight-bold'>След като тестът започне, нямате право да излизате от
                                прозореца
                                на теста или да отваряте друг браузър. При излизане от теста, вашата работа ще бъде
                                анулирана!
                            </p>
                            <div className="md-form col-md-10 mx-auto mt-4">
                                <i className="fas fa-lock prefix"/>
                                <input type="password" id={"password-start-input" + id} className="form-control"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>
                                <label htmlFor={"password-start-input" + id}>Въведете парола</label>
                            </div>
                            <p className={(!error && 'd-none') + " text-center form-text text-danger"}>
                                {error}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <div className="mx-auto d-inline-block">
                                <button type="button" onClick={startTest}
                                        className="btn btn-primary" data-dismiss="modal">Започни теста
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default withRouter(StartTestModal);