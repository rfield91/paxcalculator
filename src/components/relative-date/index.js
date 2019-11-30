import React from 'react';
import { formatRelative } from 'date-fns';
import { isString } from 'util';

export class RelativeDate extends React.Component {
    static defaultProps = {
        date: new Date(),
    };

    constructor(props) {
        super(props);
        this.state = {
            formatted: this.getFormattedDate(this.props.date),
        };
        this.interval = null;
    }

    componentDidMount() {
        this.interval = setInterval(this.handleUpdate, 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getFormattedDate = (date) => {
        if (!date) {
            return '';
        }
        if (isString(date)) {
            date = new Date(date);
        }
        return formatRelative(date, new Date());
    };

    handleUpdate = () => {
        this.setState({
            formatted: this.getFormattedDate(this.props.date),
        });
    };

    render() {
        const { as, ...props } = this.props;
        const { formatted } = this.state;
        const Component = as || 'span';
        return <Component {...props}>{formatted}</Component>;
    }
}
