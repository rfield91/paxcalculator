import React from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet';

import { withHeader } from '../header';

import './styles.less';

const { Provider, Consumer } = React.createContext();

export class PageSafeAreaProvider extends React.Component {
    state = {
        pageSafeAreaTop: 0,
        pageSafeAreaBottom: 0,
    };

    setPageSafeArea = (pageSafeArea) => {
        this.setState(pageSafeArea);
    };

    render() {
        const { children } = this.props;
        const { pageSafeAreaTop, pageSafeAreaBottom } = this.state;

        return (
            <Provider
                value={{
                    pageSafeAreaTop,
                    pageSafeAreaBottom,
                    setPageSafeArea: this.setPageSafeArea,
                }}
            >
                {children}
            </Provider>
        );
    }
}

export const withPageSafeArea = (Component) => {
    return (props) => (
        <Consumer>
            {(context = {}) => {
                return <Component {...context} {...props} />;
            }}
        </Consumer>
    );
};

@withHeader
@withPageSafeArea
export class Page extends React.Component {
    rootRef = React.createRef();
    scrollRef = React.createRef();

    componentDidMount() {
        this.handleScroll();
        setTimeout(() => {
            this.handleScroll();
        }, 25);
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.dimensions &&
            this.props.dimensions.height !== prevProps.dimensions.height
        ) {
            this.handleScroll();
        }
    }

    handleScroll = () => {
        if (!this.scrollRef.current || !this.props.setScrollTop) {
            return;
        }
        this.props.setScrollTop(this.scrollRef.current.scrollTop);
    };

    render() {
        const {
            dimensions,
            children,
            scrollTop,
            setScrollTop,
            pageSafeAreaBottom,
            lightBackground,
            noScroll,
            removeTopPadding,
            removeBottomPadding,
        } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    {lightBackground && (
                        <style type='text/css'>{`
                            :root{
                                --background: var(--background-alt);
                            }
                        `}</style>
                    )}
                </Helmet>
                <div
                    ref={this.rootRef}
                    className={cn('c-page', {
                        'c-page--no-scroll': noScroll,
                        'c-page--remove-top-padding': removeTopPadding,
                        'c-page--remove-bottom-padding': removeBottomPadding,
                    })}
                    style={{
                        '--header-height': dimensions
                            ? dimensions.height + 'px'
                            : '0px',
                        '--c-page--safe-area-bottom': pageSafeAreaBottom
                            ? pageSafeAreaBottom + 'px'
                            : '0px',
                    }}
                >
                    <div
                        className={'c-page__inside'}
                        onScroll={this.handleScroll}
                        ref={this.scrollRef}
                    >
                        <div className={'c-page__scroll'}>{children}</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Page;
