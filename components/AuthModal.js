import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Error from '../components/Error';
import axiosInstance from '../config/axios';
import { loginAsync, storeAuth } from '../store/actions/auth';

const AuthModal = () => {
    const { handleSubmit, errors, register, reset } = useForm();
    const [ loading, setLoading ] = useState(false);
    const [ formState, setFormState ] = useState('login');

    const dispatch = useDispatch();

    const signUpHandler = async (data) => {
        setLoading(true);
        let newData = data;
        try {
            const { data: response } = await axiosInstance.post('register', newData);
            dispatch(storeAuth(response.data));
            $('#authModal').modal('hide');
            setLoading(false);
        } catch(e) {
            console.log('====================================');
            console.log(e.response);
            console.log('====================================');
            setLoading(false);
        }
    };

    const loginHandler = async (data) => {
        setLoading(true);
        try {
            const loginResponse = await dispatch(loginAsync(data));
            setLoading(false);
            $('#authModal').modal('hide');
            if (loginResponse === 'error') return;
        } catch (error) {
            console.log(error, 'error');
            setLoading(false);
        }
        reset({});
    };

    const forgotPasswordHandler = () => {

    }

    return (
        <>
            <div className="modal fade" id="authModal" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <button style={{ fontSize: '3rem' }} type="button" className="close" data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body mb-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="text-center">
                                            <h2>{formState === 'login' ? 'Login' : `${formState === 'signUp' ? 'Signup' : 'Forgot Password' }`}</h2>
                                            {formState === 'signUp' && <form className='auth-form' onSubmit={handleSubmit(signUpHandler)}>
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <input type="text"
                                                            name="first_name"
                                                            placeholder="First name"
                                                            className="w-100"
                                                            ref={register({ required: 'This field is required' })} />
                                                            
                                                        {errors.first_name && <Error>{errors.first_name.message}</Error>}
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <input type="text"
                                                            name="last_name"
                                                            placeholder="Last name"
                                                            className="w-100"
                                                            ref={register({ required: 'This field is required' })} />
                                                        {errors.last_name && <Error>{errors.last_name.message}</Error>}
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <input type="email"
                                                            name="email"
                                                            placeholder="Email"
                                                            className="w-100"
                                                            ref={register({ required: 'This field is required' })} />
                                                        {errors.email && <Error>{errors.email.message}</Error>}
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <input type="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            className="w-100"
                                                            ref={register({ required: 'This field is required' })} />
                                                        {errors.password && <Error>{errors.password.message}</Error>}
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                        <button disabled={loading} type="submit" className="btn btn-login">
                                                            {!loading ? 'Submit' : 'Submitting...'}
                                                        </button>
                                                </div>
                                            </form>}
                                            {formState === 'login' && <form className='auth-form' onSubmit={handleSubmit(loginHandler)}>
                                                <div className="row">
                                                    <div className="col-12 mb-4">
                                                        <input type="email"
                                                            name="email"
                                                            placeholder="Email"
                                                            className="w-100"
                                                            ref={register({ required: 'This field is required' })} />
                                                        {errors.email && <Error>{errors.email.message}</Error>}
                                                    </div>
                                                    <div className="col-12 mb-4">
                                                        <input type="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            className="w-100"
                                                            ref={register({ required: 'This field is required' })} />
                                                        {errors.password && <Error>{errors.password.message}</Error>}
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                        <button disabled={loading} type="submit" className="btn btn-login">
                                                            {!loading ? 'Submit' : 'Submitting...'}
                                                        </button>
                                                </div>
                                            </form>}
                                            {formState === 'forgot' && <form className='auth-form' onSubmit={handleSubmit(forgotPasswordHandler)}>
                                                <div className="row">
                                                    <div className="col-12 mb-4">
                                                        <input type="email"
                                                            name="email"
                                                            placeholder="Email"
                                                            className="w-100"
                                                            ref={register({ required: 'This field is required' })} />
                                                        {errors.email && <Error>{errors.email.message}</Error>}
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                        <button disabled={loading} type="submit" className="btn btn-login">
                                                            {!loading ? 'Submit' : 'Submitting...'}
                                                        </button>
                                                </div>
                                            </form>}
                                            <div className="d-flex align-items-center justify-content-between">
                                                <p> {formState === 'signUp' ? 'Already signed up?' : `Haven't signup yet?`} 
                                                    {formState === 'signUp' ? <span onClick={() => setFormState('login')} className='cursor'>Login</span> : <span onClick={() => setFormState('signUp')} className='cursor'> Signup</span> }
                                                </p>
                                                {/* <p onClick={() => setFormState('forgot')} className='cursor'>Forgot password?</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AuthModal;