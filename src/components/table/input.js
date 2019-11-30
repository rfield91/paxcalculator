import React from 'react';
import cn from 'classnames';
import TextareaAutosize from 'react-autosize-textarea';
import { TableFlexRow, TableFlexRowCell } from '.';
import { Text } from '../text';

export const TableRowInput = ({ label, multiline, code, ...props }) => {
    const Input = multiline ? TextareaAutosize : 'input';

    return (
        <TableFlexRow
            className={cn('c-table__row-input', {
                'c-table__row-input--multiline': multiline,
                'c-table__row-input--code': code,
            })}
        >
            <TableFlexRowCell className='c-table__row-input__label'>
                <Text>{label}</Text>
            </TableFlexRowCell>
            <TableFlexRowCell className='c-table__row-input__input'>
                <Input spellCheck={code ? false : true} {...props} />
            </TableFlexRowCell>
        </TableFlexRow>
    );
};
