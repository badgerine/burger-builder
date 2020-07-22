import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxilliary from '../../containers/Auxilliary/Auxilliary';

const withErrorHandler = ((WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState();

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        useEffect(() => {
            return () => {//return is the clean up function when these intereceptors change
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <Auxilliary>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    Something didn't work... | {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxilliary>
        );
    }
})

export default withErrorHandler;