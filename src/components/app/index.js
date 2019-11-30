import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Screens } from '../../navigation';

const RouteScreen = ({ path, exact, component, ...props }) => {
    const Component = component;
    return (
        <Route path={path} exact={exact}>
            {(routeProps) => <Component {...routeProps} {...props} />}
        </Route>
    );
};

@withRouter
@connect((state) => ({}))
export default class App extends React.Component {
    static defaultProps = {};

    render() {
        return (
            <div className='app'>
                <Screens />
            </div>
        );
    }
}
