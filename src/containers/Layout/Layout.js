import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxilliary from '../Auxilliary/Auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar openDrawer={this.sideDrawerOpenedHandler} isAuthenticated={this.props.token}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closeDrawer={this.sideDrawerClosedHandler} 
                    isAuthenticated={this.props.token} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);