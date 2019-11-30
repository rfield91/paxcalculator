import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { Header, HeaderProvider } from '../components/header';
import HomeScreen from '../screens/home';

const HeaderNavigation = ({ children }) => (
    <HeaderProvider>
        <Header />
        {children}
    </HeaderProvider>
);

const RouteScreen = ({ path, exact, component, ...props }) => {
    const Component = component;
    return (
        <Route path={path} exact={exact}>
            {(routeProps) => <Component {...routeProps} {...props} />}
        </Route>
    );
};

export const Screens = () => (
    <HeaderNavigation>
        <Switch>
            <RouteScreen path='/' component={HomeScreen} />
        </Switch>
    </HeaderNavigation>
);
