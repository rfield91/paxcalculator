import cn from 'classnames';
import React from 'react';
import './styles.less';

export const LargeHeader = ({ title, beforeTitle, accessory, hidden }) => {
    return (
        <div
            className={cn('c-large-header', {
                'c-large-header--hidden': hidden,
            })}
        >
            <div className='c-large-header__inside'>
                <div className='c-large-header__title'>
                    {beforeTitle && (
                        <div className='c-large-header__before'>
                            {beforeTitle}
                        </div>
                    )}
                    <div className='c-large-header__main'>{title}</div>
                </div>
                <div className='c-large-header__accessory'>{accessory}</div>
            </div>
        </div>
    );
};

export default LargeHeader;
