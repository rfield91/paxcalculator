import React from 'react';
import cn from 'classnames';
import { isBoolean } from 'lodash';
import { mdiChevronRight } from '@mdi/js';

import Icon from '../icon';
import './styles.less';

export const TableRow = ({
    accessory,
    left,
    children,
    className,
    title,
    subTitle,
    as,
    maxTitleLines,
    maxSubTitleLines,
    ...props
}) => {
    const Component = as || 'div';

    return (
        <Component className={cn('c-table__row', className)} {...props}>
            {left && <div className={'c-table__row__left'}>{left}</div>}
            <div className={'c-table__row__middle'}>
                {title && (
                    <div
                        className={cn('c-table__row__title', {
                            'c-table__row__title--clamp': maxTitleLines,
                        })}
                        style={{
                            ...(maxTitleLines
                                ? {
                                      lineClamp: maxTitleLines,
                                      WebkitLineClamp: maxTitleLines,
                                  }
                                : undefined),
                        }}
                    >
                        {title}
                    </div>
                )}
                {subTitle && (
                    <div
                        className={cn('c-table__row__subtitle', {
                            'c-table__row__subtitle--clamp': maxTitleLines,
                        })}
                        style={{
                            ...(maxSubTitleLines
                                ? {
                                      lineClamp: maxSubTitleLines,
                                      WebkitLineClamp: maxSubTitleLines,
                                  }
                                : undefined),
                        }}
                    >
                        {subTitle}
                    </div>
                )}
            </div>
            {accessory && (
                <div className={'c-table__row__accessory'}>{accessory}</div>
            )}
        </Component>
    );
};

export const TableFlexRow = ({
    children,
    className,
    indicator,
    minimal,
    removeOutsidePadding,
    as,
    ...props
}) => {
    const Component = as || 'div';
    return (
        <Component
            className={cn(
                'c-table__flex-row',
                {
                    'c-table__flex-row--minimal': minimal,
                    'c-table__flex-row--remove-outside-padding': removeOutsidePadding,
                },
                className
            )}
            {...props}
        >
            <div className={'c-table__flex-row__inside'}>
                <div className={'c-table__flex-row__cells'}>{children}</div>
                {indicator && (
                    <div className={'c-table__flex-row__indicator'}>
                        <Icon
                            path={
                                isBoolean(indicator)
                                    ? mdiChevronRight
                                    : indicator
                            }
                        />
                    </div>
                )}
            </div>
        </Component>
    );
};

export const TableFlexRowCell = ({
    as,
    className,
    flex,
    width,
    children,
    style,
    ...props
}) => {
    const Component = as || 'div';
    return (
        <Component
            className={cn('c-table__flex-row__cell', className)}
            style={{
                flex,
                width,
                ...style,
            }}
            {...props}
        >
            {children}
        </Component>
    );
};

export const TableGroup = ({
    children,
    className,
    title,
    removeTitlePadding,
}) => {
    return (
        <div
            className={cn(
                'c-table__group',
                {
                    'c-table__group--remove-title-padding': removeTitlePadding,
                },
                className
            )}
        >
            {title && <div className={'c-table__group__title'}>{title}</div>}
            <div className={'c-table__group__inside'}>{children}</div>
        </div>
    );
};

export const TableRowButton = ({ children, className, as, ...props }) => {
    const Component = as || 'button';
    return (
        <Component className={cn('c-table__button', className)} {...props}>
            {children}
        </Component>
    );
};

// export const Table = ({ children, className }) => {
//     return <div className={cn('c-table', className)}></div>;
// };

// export default Table;
