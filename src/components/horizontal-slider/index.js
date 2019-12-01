import React from 'react';
import cn from 'classnames';
import Icon from '@mdi/react';
import { isNumber } from 'lodash';

import './styles.less';

export const HorizontalSliderItem = ({ children }) => {
    return <div className='c-horizontal-slider__item'>{children}</div>;
};

export const HorizontalSlider = ({
    className,
    children,
    margin,
    gap,
    show,
    itemSize,
    itemColumns,
}) => {
    return (
        <div
            className={cn('c-horizontal-slider', className)}
            style={{
                '--c-horizontal-slider__margin': isNumber(margin)
                    ? margin + 'px'
                    : margin,
                '--c-horizontal-slider__gap': isNumber(gap) ? gap + 'px' : gap,
                '--c-horizontal-slider__show': show,
                '--c-horizontal-slider__item-columns': itemColumns,
                '--c-horizontal-slider__item-size': itemSize,
            }}
        >
            <div className='c-horizontal-slider__items'>{children}</div>
        </div>
    );
};

export default HorizontalSlider;
