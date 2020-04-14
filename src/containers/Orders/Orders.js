import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import classes from './Orders.module.css';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
            }).catch(err => {
                this.setState({ loading: false });
            });
    }

    render() {
        let orders = this.state.orders.map(order => {
            return <p>{JSON.stringify(order)}</p>
        });
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);