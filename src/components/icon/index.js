import React from 'react';
import cn from 'classnames';
import MDIIcon from '@mdi/react';

import './styles.less';

export const Icon = ({ className, path, svg, ...props }) => {
    let SVG = svg;

    return (
        <span
            className={cn('c-icon', className, {
                'c-icon--mdi': path,
                'c-icon--svg': svg,
            })}
        >
            {path ? <MDIIcon size={'1em'} path={path} {...props} /> : <SVG />}
        </span>
    );
};

export default Icon;
