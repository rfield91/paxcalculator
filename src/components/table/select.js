import React from 'react';
import cn from 'classnames';
import { map, reduce, each } from 'lodash-es';
import { TableFlexRow, TableFlexRowCell } from '.';
import { Text } from '../text';

const getLabelForValue = (options, value) => {
    return reduce(
        options,
        (selectedLabel, option) => {
            if (option.options && option.options.length) {
                each(option.options, (option) => {
                    if (option.value === value) {
                        selectedLabel = option.label;
                    }
                });
            }
            if (option.value === value) {
                selectedLabel = option.label;
            }
            return selectedLabel;
        },
        ''
    );
};

export const TableRowSelect = ({
    label,
    options,
    value,
    placeholder,
    ...props
}) => {
    return (
        <TableFlexRow className={cn('c-table__row-select')}>
            <TableFlexRowCell className='c-table__row-input__label'>
                <Text>{label}</Text>
            </TableFlexRowCell>
            <TableFlexRowCell className='c-table__row-input__input'>
                <input
                    tabIndex='-1'
                    readOnly
                    placeholder={
                        placeholder
                            ? placeholder
                            : getLabelForValue(options, '')
                    }
                    value={value ? getLabelForValue(options, value) : ''}
                />
                <select value={value} {...props}>
                    {map(options, ({ label, value, group, options }) => {
                        if (options && options.length) {
                            return (
                                <optgroup label={group} key={group}>
                                    {map(options, ({ label, value }) => (
                                        <option value={value} key={value}>
                                            {label}
                                        </option>
                                    ))}
                                </optgroup>
                            );
                        }

                        return (
                            <option value={value} key={value}>
                                {label}
                            </option>
                        );
                    })}
                </select>
            </TableFlexRowCell>
        </TableFlexRow>
    );
};
