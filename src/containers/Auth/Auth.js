import React, { Component } from 'react';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Auth extends Component {
    state = {
        controls: {
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
        }
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = isValid && value.trim() !== '';
        }

        if (rules.minLength) {
            isValid = isValid && value.length >= rules.minLength;
        }

        if (rules.maxLength) {
            isValid = isValid && value.length <= rules.maxLength;
        }

        if(rules.isEmail) {
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            isValid = isValid && pattern.test(value);
        }

        return isValid;
    }

    inputChangedHandler = (event, key) => {
        const eventValue = event.target.value;
        console.log(eventValue);
        //dont just shallow-clone the elements of orderForm, but deep-clone (ie clone the children too)
        const updatedControls = { 
            ...this.state.controls,
            [key]: {
                ...this.state.controls[key],
                value: eventValue,
                valid: this.checkValidity(eventValue, this.state.controls[key].validation),
                touched: true
            }
        };
        
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email, this.state.controls.password);
    }


    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                inputType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));
        
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        onAuth: (email,password) => dispatch(actions.auth(email,password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);