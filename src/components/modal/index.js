import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './styles.less';
import Page, { PageSafeAreaProvider } from '../page';
import { HeaderProvider, Header, HeaderOptions } from '../header';

class FreezeChildren extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.freeze) {
            return false;
        }
        return true;
    }

    render() {
        return this.props.children;
    }
}

export class Modal extends React.Component {
    render() {
        const { show, children, headerOptions } = this.props;

        return ReactDOM.createPortal(
            <CSSTransition
                in={show}
                timeout={500}
                classNames='c-modal-'
                unmountOnExit
            >
                <PageSafeAreaProvider>
                    <HeaderProvider>
                        <div className='c-modal'>
                            <Header />
                            <HeaderOptions
                                showHeaderWithScroll={false}
                                back={null}
                                right={null}
                                {...headerOptions}
                            />
                            <FreezeChildren freeze={!show}>
                                {children}
                            </FreezeChildren>
                        </div>
                    </HeaderProvider>
                </PageSafeAreaProvider>
            </CSSTransition>,
            document.querySelector('#root')
        );
    }
}
