import cn from 'classnames';
import gsap from 'gsap';
import React from 'react';
import './styles.less';

export class Collapse extends React.Component {
    static defaultProps = {
        open: false,
    };

    rootRef = React.createRef();
    insideRef = React.createRef();

    updateContainer = () => {
        const targetHeight = this.insideRef.current.clientHeight;

        gsap.to(this.rootRef.current, {
            duration: 0.25,
            height: this.props.open ? targetHeight + 'px' : '0pc',
        });
    };

    componentDidMount() {
        if (!this.props.open) {
            this.rootRef.current.style.height = '0px';
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.open !== prevProps.open) {
            this.updateContainer();
        }
    }

    render() {
        const { className, children, open, style, ...props } = this.props;
        return (
            <div
                ref={this.rootRef}
                className={cn('c-collapse', className)}
                style={{
                    overflow: 'hidden',
                    ...style,
                }}
                {...props}
            >
                <div className='c-collapse__inside' ref={this.insideRef}>
                    {children}
                </div>
            </div>
        );
    }
}
