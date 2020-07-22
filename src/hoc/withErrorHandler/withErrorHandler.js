import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxilliary from '../../containers/Auxilliary/Auxilliary';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = ((WrappedComponent, axios) => {
    return (props) => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Auxilliary>
                <Modal show={error} modalClosed={clearError}>
                    Something didn't work... | {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxilliary>
        );
    }
})

export default withErrorHandler;