import React from 'react';
import cn from 'classnames';

import Icon from '../icon';

import './styles.less';

export const Text = ({
    as,
    title,
    className,
    children,
    small,
    light,
    truncate,
    ...props
}) => {
    const Component = as || 'span';

    return (
        <Component
            className={cn(
                'c-text',
                {
                    'c-text--small': small,
                    'c-text--light': light,
                    'c-text--truncate': truncate,
                },
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};
