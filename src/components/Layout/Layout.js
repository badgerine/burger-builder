import React, { Component } from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }//this method should replace sideDrawerClosedHandler and sideDrawerOpenedHandler.

    render() {
        return (
            <Auxilliary>
                <Toolbar openDrawer={this.sideDrawerOpenedHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closeDrawer={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilliary>
        );
    }
}

export default Layout;