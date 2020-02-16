import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxilliary from '../../containers/Auxilliary/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props){
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        state = {
            error: null
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Auxilliary>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        Something didn't work... | {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxilliary>
            );
        }
    }

}

export default withErrorHandler;