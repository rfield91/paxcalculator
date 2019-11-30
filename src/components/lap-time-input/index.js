import React from 'react';
import cn from 'classnames';
import { map, range } from 'lodash-es';

import './styles.less';
import characters from './characters';

export const Character = ({ char, ...props }) => {
    const character = characters[char] || characters['0'];
    return (
        <div
            className={cn('c-lap-time-input__character')}
            data-char={char || ''}
            {...props}
        >
            {map(range(7), (y) =>
                map(range(5), (x) => {
                    return (
                        <div
                            key={`${x}${y}`}
                            className={character[y][x] ? 'active' : ''}
                        ></div>
                    );
                })
            )}
        </div>
    );
};

export const LapTimeInput = ({
    value,
    maxLength,
    onChange,
    placeholder,
    ...props
}) => {
    maxLength = maxLength || 8;
    let paddedValue = value.padStart(maxLength, ' ');

    return (
        <div className={cn('c-lap-time-input')} {...props}>
            <label>
                <input
                    maxLength={maxLength}
                    value={value}
                    onKeyDown={(event) => {
                        const length = event.target.value.length;
                        event.target.setSelectionRange(length, length);
                        if (event.key === 'Enter') {
                            event.target.blur();
                        }
                    }}
                    onKeyPress={(event) => {
                        if (
                            event.key === '.' &&
                            event.target.value.indexOf('.') !== -1
                        ) {
                            event.preventDefault();
                        }
                    }}
                    onChange={(event) => {
                        const length = event.target.value.length;
                        event.target.setSelectionRange(length, length);

                        if (onChange) {
                            onChange(event);
                        }
                    }}
                    type='text'
                    min='0'
                    inputMode='decimal'
                    pattern='[-+]?[0-9]*[.,]?[0-9]+'
                    onFocus={(event) => {
                        const length = event.target.value.length;
                        event.target.setSelectionRange(length, length);
                    }}
                />
                <div className='c-lap-time-input__display'>
                    {map(range(maxLength), (r, index) => (
                        <Character key={index} char={paddedValue[index]} />
                    ))}
                </div>
            </label>
        </div>
    );
};
