import React from 'react';
import cn from 'classnames';

import './styles.less';

export const Gem = ({ children, className, ...props }) => (
    <div className={cn('c-gem', className)} {...props}>
        <div className='c-gem__background' />
        <div className='c-gem__value'>{children}</div>
    </div>
);

export const Gemify = ({ children, value, position }) => (
    <div className={cn('c-gemify')}>
        <div className='c-gemify__content'>{children}</div>
        {value ? (
            <div className='c-gemify__gem'>
                <Gem>{value}</Gem>
            </div>
        ) : null}
    </div>
);
