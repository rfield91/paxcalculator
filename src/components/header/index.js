import { clamp, isEqual, keys, pick, debounce } from 'lodash';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { mdiChevronLeft } from '@mdi/js';
import ResizeObserver from 'resize-observer-polyfill';

import Icon from '../icon';
import './styles.less';

const { Provider, Consumer } = React.createContext();

export class HeaderProvider extends React.Component {
    state = {
        showHeaderWithScroll: false,
        scrollTop: 0,
        titleContainer: null,
        title: '',
        back: null,
        right: null,
        left: null,
        dimensions: {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
        },
    };

    setTitleContainer = (titleContainer) => {
        this.setState({ titleContainer });
    };

    setDimensions = (dimensions) => {
        this.setState({ dimensions });
    };

    setScrollTop = (scrollTop) => {
        this.setState({ scrollTop });
    };

    setHeaderOptions = (options) => {
        this.setState(options);
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        this.setState({
            scrollTop: Math.round(document.scrollingElement.scrollTop),
        });
    };

    render() {
        const { children } = this.props;
        const {
            titleContainer,
            dimensions,
            scrollTop,
            showHeaderWithScroll,
            back,
            right,
            left,
            title,
        } = this.state;

        return (
            <Provider
                value={{
                    titleContainer,
                    dimensions,
                    scrollTop,
                    showHeaderWithScroll,
                    back,
                    right,
                    left,
                    title,
                    setTitleContainer: this.setTitleContainer,
                    setDimensions: this.setDimensions,
                    setScrollTop: this.setScrollTop,
                    setHeaderOptions: this.setHeaderOptions,
                }}
            >
                {children}
            </Provider>
        );
    }
}

export const withHeader = (Component) => {
    return (props) => (
        <Consumer>
            {(context = {}) => {
                return <Component {...context} {...props} />;
            }}
        </Consumer>
    );
};

export const BackButton = ({ label, className, ...props }) => {
    return (
        <Link className={cn('c-header__back-button', className)} {...props}>
            <div className={'c-header__back-button__icon'}>
                <Icon path={mdiChevronLeft} />
            </div>
            <div className={'c-header__back-button__label'}>{label}</div>
        </Link>
    );
};

@withHeader
export class Header extends React.Component {
    rootRef = React.createRef();
    titleRef = React.createRef();
    resizeObserver = null;
    handleResizeDebounced = debounce(() => {
        this.handleResize();
    }, 50);

    handleResize = () => {
        if (!this.rootRef.current || !this.props.setDimensions) {
            return;
        }
        this.props.setDimensions(
            this.rootRef.current.getBoundingClientRect().toJSON()
        );
    };

    componentDidMount() {
        if (this.props.setTitleContainer) {
            this.props.setTitleContainer(this.titleRef);
        }

        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.resizeObserver.observe(this.rootRef.current);
        this.handleResizeDebounced();
        setTimeout(this.handleResizeDebounced, 100);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.setTitleContainer !== this.props.setTitleContainer) {
            this.props.setTitleContainer(this.titleRef);
        }
        if (!isEqual(prevProps, this.props)) {
            this.handleResizeDebounced();
        }
    }

    componentWillUnmount() {
        this.resizeObserver.disconnect();
    }

    render() {
        const {
            scrollTop,
            dimensions,
            showHeaderWithScroll,
            back,
            right,
            left,
            title,
        } = this.props;
        let opacity = 1;
        let titleOpacity = 1;

        if (showHeaderWithScroll) {
            opacity =
                dimensions.height !== 0
                    ? clamp(scrollTop / dimensions.height, 0, 1)
                    : 0;
            titleOpacity = opacity > 0.5 ? 1 : 0;
        }

        return (
            <React.Fragment>
                <div
                    className='c-header__fixed-background'
                    style={{
                        display: showHeaderWithScroll ? 'block' : 'none',
                        transform: `translate3d(0,${Math.max(
                            scrollTop * -1,
                            0
                        )}px,0)`,
                        height: '10vh',
                        height: dimensions.height + 100 + 'px',
                        // height: `calc(${Math.round(
                        //     dimensions.height
                        // )}px + ${Math.min(scrollTop, 0) * -1}px + 10px)`,
                    }}
                />
                <div className={cn('c-header')} ref={this.rootRef}>
                    <div className='c-header__background' />
                    <div className='c-header__border' style={{ opacity }} />
                    <div className='c-header__inside'>
                        <div
                            className='c-header__title'
                            ref={this.titleRef}
                            style={{
                                opacity: titleOpacity,
                                transition:
                                    showHeaderWithScroll && scrollTop !== 0
                                        ? 'opacity .25s'
                                        : 'none',
                            }}
                        >
                            {title}
                        </div>
                        {left && <div className='c-header__left'>{left}</div>}
                        {back && <BackButton {...back} />}
                        {right && (
                            <div className='c-header__right'>{right}</div>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export const HeaderTitle = withHeader(({ children, titleContainer }) => {
    if (titleContainer) {
        return ReactDOM.createPortal(children, titleContainer.current);
    }
    return null;
});

@withHeader
export class HeaderOptions extends React.Component {
    static defaultProps = {
        showHeaderWithScroll: false,
        title: '',
        back: false,
        right: false,
    };

    updateOptions = () => {
        const {
            showHeaderWithScroll,
            back,
            right,
            left,
            setHeaderOptions,
            title,
        } = this.props;

        if (!setHeaderOptions) {
            return;
        }

        setHeaderOptions({
            ...HeaderOptions.defaultProps,
            showHeaderWithScroll,
            back,
            right,
            left,
            title,
        });
    };

    componentDidMount() {
        this.updateOptions();
    }

    componentDidUpdate(prevProps) {
        if (
            !isEqual(
                pick(this.props, keys(HeaderOptions.defaultProps)),
                pick(prevProps, keys(HeaderOptions.defaultProps))
            )
        ) {
            this.updateOptions();
        }
    }

    render() {
        return null;
    }
}
