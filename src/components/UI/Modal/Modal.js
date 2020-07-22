import React, { Component, useEffect } from 'react';
import classes from './Modal.module.css';
import Auxilliary from '../../../containers/Auxilliary/Auxilliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {

    useEffect(() => {
    }, [props.show, props.children]);

    return (
        <Auxilliary>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Auxilliary>
    );
}

export default Modal;