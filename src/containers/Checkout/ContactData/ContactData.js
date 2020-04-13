import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Max Swartz',
                address: {
                    street: '3 Banga Rd',
                    zipCode: '1212',
                    country: 'RSA'
                },
                email: 'ms@ttmail.com',
                deliveryMethod: 'fastmail'
            }
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

    render() {
        let form = (
            <form >
                <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal code" />
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