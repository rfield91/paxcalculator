import React from 'react';
import cn from 'classnames';

import { withPageSafeArea } from '../page';
import { Gemify } from '../gem';
import './styles.less';

// export const TabBar = ({ as, children, className, ...props }) => {
//     return (
//         <div className={cn('c-tab-bar', className)}>
//             <div className='c-tab-bar__tabs'>{children}</div>
//         </div>
//     );
// };

@withPageSafeArea
export class TabBar extends React.Component {
    rootRef = React.createRef();

    componentDidMount() {
        if (this.props.setPageSafeArea) {
            this.props.setPageSafeArea({
                pageSafeAreaBottom: this.rootRef.current.getBoundingClientRect()
                    .height,
            });
        }
    }

    render() {
        const { as, children, className, ...props } = this.props;
        return (
            <div className={cn('c-tab-bar', className)} ref={this.rootRef}>
                <div className='c-tab-bar__tabs'>{children}</div>
            </div>
        );
    }
}

export const Tab = ({
    as,
    label,
    icon,
    className,
    notifications,
    ...props
}) => {
    const Component = as || 'a';

    return (
        <Component
            className={cn('c-tab-bar__tab')}
            activeClassName='c-tab-bar__tab--active'
            {...props}
        >
            <div className='c-tab-bar__tab__icon'>
                {notifications ? (
                    <Gemify value={notifications}>{icon}</Gemify>
                ) : (
                    icon
                )}
            </div>
            <div className='c-tab-bar__tab__label'>{label}</div>
        </Component>
    );
};
