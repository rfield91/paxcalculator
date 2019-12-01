import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { map, range } from 'lodash-es';

import './styles.less';
import characters from './characters';

export const Character = ({ char, ...props }) => {
    const character = characters[char] || characters[' '];
    return (
        <div className={cn('c-lap-time-input__character')} {...props}>
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

export const CharacterDisplay = ({ value, length, ...props }) => {
    return (
        <div className='c-lap-time-input__display'>
            {map(range(length), (r, index) => (
                <Character key={index} char={value[index]} />
            ))}
        </div>
    );
};

export const LapTimeInput = ({
    value,
    maxLength,
    onChange,
    placeholder,
    showMessage,
    ...props
}) => {
    maxLength = maxLength || 10;
    let paddedValue = value.padStart(maxLength, ' ');
    let callToActionMessage = 'tap here to enter a lap time';

    let fullMessage = callToActionMessage.padStart(
        callToActionMessage.length + maxLength * 2,
        ' '
    );
    let [isFocused, setFocus] = useState(false);
    let [message, setMessage] = useState(fullMessage);

    const cursorOn = '|'.padStart(maxLength, ' ');
    const cursorOff = ''.padStart(maxLength, ' ');
    const showCursor = isFocused && !value;
    let [cursor, setCursor] = useState(cursorOff);

    useInterval(() => {
        if (showCursor) {
            setCursor(cursor === cursorOn ? cursorOff : cursorOn);
        }
    }, 500);

    useInterval(() => {
        if (showMessage) {
            setMessage(message.slice(1) + message.slice(0, 1));
        }
    }, 250);

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
                            return;
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

                        const patternRegExp = new RegExp(
                            event.target.pattern + '*$'
                        );
                        if (
                            event.target.value &&
                            !patternRegExp.exec(event.target.value)[0]
                        ) {
                            event.preventDefault();
                            return false;
                        }
                        if (onChange) {
                            onChange(event);
                        }
                    }}
                    type='text'
                    min='0'
                    inputMode='decimal'
                    pattern='[0-9\.]'
                    onFocus={(event) => {
                        setFocus(true);
                        const length = event.target.value.length;
                        event.target.setSelectionRange(length, length);
                    }}
                    onBlur={() => {
                        setFocus(false);
                    }}
                />
                <CharacterDisplay
                    value={
                        !isFocused && !value && showMessage
                            ? message
                            : showCursor
                            ? cursor
                            : paddedValue
                    }
                    length={maxLength}
                />
            </label>
        </div>
    );
};

export class CharacterCanvas extends React.Component {
    static defaultProps = {
        character: [],
        onChange: null,
    };

    handlePixelDraw = (x, y) => (event) => {
        if (!event.buttons) {
            return;
        }
        const nextCharacter = JSON.parse(JSON.stringify(this.props.character));
        nextCharacter[y][x] = nextCharacter[y][x] ? 0 : 1;
        if (this.props.onChange) {
            this.props.onChange(nextCharacter);
        }
    };

    render() {
        const { character, ...props } = this.props;

        return (
            <div className={cn('c-lap-time-input__character')} {...props}>
                {map(range(7), (y) =>
                    map(range(5), (x) => {
                        return (
                            <div
                                key={`${x}${y}`}
                                className={character[y][x] ? 'active' : ''}
                                onMouseDown={this.handlePixelDraw(x, y)}
                                onMouseEnter={this.handlePixelDraw(x, y)}
                            ></div>
                        );
                    })
                )}
            </div>
        );
    }
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
