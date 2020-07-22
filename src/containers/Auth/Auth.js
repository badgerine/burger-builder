import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { checkValidity, updateObject } from '../../utility/utility';
import classes from './Auth.module.css';

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const [isSignUp, setSignUp] = useState(false);

    const inputChangedHandler = (event, key) => {
        const eventValue = event.target.value;
        //dont just shallow-clone the elements of orderForm, but deep-clone (ie clone the children too)
        const updatedControl = updateObject(controls[key], {
            value: eventValue,
            valid: checkValidity(eventValue, controls[key].validation),
            touched: true
        });

        const updatedControls = updateObject(controls, {
            [key]: updatedControl
        });

        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    }

    const switchAuthModeHandler = () => {
        setSignUp(!isSignUp);
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            inputType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ));

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (<p>{props.error.message}</p>);
    }

    //implemented simpler/more suitable solution instead of 'S18#336 redirecting the user to the checkout page'
    let authRedirect = null;
    if (props.isAuthenticated && props.building) {
        authRedirect = <Redirect to="/checkout" />
    } else if (props.isAuthenticated) {
        authRedirect = <Redirect to="/" />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            <form onSubmit={submitHandler}>
                {form}
                {errorMessage}
                <Button btnType="Success">{isSignUp ? 'SIGNUP' : 'SIGNIN'}</Button>
            </form>
            <Button btnType='Danger' click={switchAuthModeHandler}>
                SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}
            </Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token,
        building: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);