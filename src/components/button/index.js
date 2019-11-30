import React from 'react';
import cn from 'classnames';

import Icon from '../icon';

import './styles.less';

export const BUTTON_SIZE_SMALL = 'BUTTON_SIZE_SMALL';

export const Button = ({
    as,
    label,
    type,
    className,
    size,
    chromeless,
    block,
    primary,
    ...props
}) => {
    const Component = as || 'a';

    return (
        <Component
            className={cn(
                'c-button',
                {
                    'c-button--small': size === BUTTON_SIZE_SMALL,
                    'c-button--chromeless': chromeless,
                    'c-button--block': block,
                    'c-button--primary': primary,
                },
                className
            )}
            {...props}
        >
            <div className='c-button__label'>{label}</div>
        </Component>
    );
};
