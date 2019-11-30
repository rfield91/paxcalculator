import React from 'react';
import cn from 'classnames';
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';

import './styles.less';

export const SECTION_TYPE_ALERT = 'SECTION_TYPE_ALERT';

export const SectionLinkedTitle = ({ className, children, as, ...props }) => {
    const Component = as || 'a';

    return (
        <Component
            className={cn('c-section__linked-title', className)}
            {...props}
        >
            <div className='c-section__linked-title__title'>{children}</div>
            <div className='c-section__linked-title__icon'>
                <Icon path={mdiChevronRight} size={'1em'} />
            </div>
        </Component>
    );
};

export class Section extends React.Component {
    render() {
        const {
            title,
            removeMargin,
            more,
            children,
            type,
            className,
            forwardedRef,
            ...props
        } = this.props;

        return (
            <section
                ref={forwardedRef}
                className={cn(
                    'c-section',
                    {
                        'c-section--has-title': title,
                        'c-section--remove-margin': removeMargin,
                        [`c-section--type-${type}`]: type,
                    },
                    className
                )}
                {...props}
            >
                {title || more ? (
                    <div className='c-section__header'>
                        {title && (
                            <div className='c-section__title'>{title}</div>
                        )}
                        {more && <div className='c-section__more'>{more}</div>}
                    </div>
                ) : null}
                <div className='c-section__content'>{children}</div>
            </section>
        );
    }
}

export default Section;
