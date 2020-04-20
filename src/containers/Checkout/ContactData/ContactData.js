import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest Method' },
                        { value: 'economy', displayValue: 'Economy' }
                    ]
                },
                value: ''
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice
        }

        axios.post('orders.json/', order)
            .then(response => {
                this.setState({ loading: false });
                console.log(response);
                this.props.history.push('/');

            })
            .catch(error => {
                this.setState({ loading: false });
                console.log('error: ' + error)
            })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedOrderForm = {... this.state.orderForm}
        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        const fromElementsArray = [];
        for (let key in this.state.orderForm) {
            fromElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form >
                {fromElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        inputtype={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" click={this.orderHandler}>ORDER</Button>
            </form>);

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;