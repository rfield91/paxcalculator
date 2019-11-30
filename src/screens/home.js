import { mdiTimer } from '@mdi/js';
import { replace } from 'connected-react-router';
import { find } from 'lodash-es';
import map from 'lodash-es/map';
import OpenColor from 'open-color';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { Button } from '../components/button';
import { Collapse } from '../components/collapse';
import { HeaderOptions } from '../components/header';
import {
    HorizontalSlider,
    HorizontalSliderItem,
} from '../components/horizontal-slider';
import Icon from '../components/icon';
import { LapTimeInput } from '../components/lap-time-input';
import { Modal } from '../components/modal';
import { Page } from '../components/page';
import { RelativeDate } from '../components/relative-date';
import Section from '../components/section';
import {
    TableFlexRow,
    TableFlexRowCell,
    TableGroup,
} from '../components/table';
import { TableRowSelect } from '../components/table/select';
import { Text } from '../components/text';
import { PAX_VALUES, PAX_VALUES_FLATTENED } from '../constants';
import { addLap, deleteLap, deleteAllLaps } from '../redux/app';

const CalculatedTimes = ({ paxClass, time }) => {
    time = parseFloat(time);
    if (isNaN(time)) {
        time = 0;
    }
    const selectedPaxClass = find(PAX_VALUES_FLATTENED, {
        name: paxClass,
    });

    return (
        <HorizontalSlider itemSize={1.75} gap='2em'>
            {map(PAX_VALUES, ({ name, values }) => (
                <HorizontalSliderItem key={name}>
                    <TableGroup title={name} removeTitlePadding>
                        {map(values, ({ name, pax }) => {
                            var timeToBeat = (
                                (parseFloat(time) *
                                    (selectedPaxClass
                                        ? selectedPaxClass.pax
                                        : 0)) /
                                pax
                            ).toFixed(3);

                            return (
                                <TableFlexRow
                                    key={name}
                                    minimal
                                    removeOutsidePadding
                                    style={{
                                        color:
                                            selectedPaxClass &&
                                            name === selectedPaxClass.name
                                                ? OpenColor.blue[9]
                                                : 'inherit',
                                    }}
                                >
                                    <TableFlexRowCell flex='1'>
                                        <Text
                                            style={{
                                                fontWeight: '700',
                                            }}
                                        >
                                            {name}
                                        </Text>
                                    </TableFlexRowCell>
                                    <TableFlexRowCell
                                        flex='1'
                                        style={{
                                            textAlign: 'right',
                                        }}
                                    >
                                        {timeToBeat}
                                    </TableFlexRowCell>
                                </TableFlexRow>
                            );
                        })}
                    </TableGroup>
                </HorizontalSliderItem>
            ))}
        </HorizontalSlider>
    );
};

@connect((state) => ({
    laps: state.app.laps,
    lastPaxClass: state.app.lastPaxClass,
}))
export default class HomeScreen extends React.Component {
    static defaultProps = {
        laps: [],
    };

    state = {
        time: '',
        paxClass: this.props.lastPaxClass,
    };

    handleSaveLapClick = () => {
        this.props.dispatch(
            addLap({
                time: this.state.time,
                paxClass: this.state.paxClass || this.props.lastPaxClass,
                date: new Date().toString(),
            })
        );
        this.setState({
            time: '',
            paxClass: '',
        });
    };

    handleDeleteAllLapsButtonClick = () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete all laps?`
        );
        if (confirmed) {
            this.props.dispatch(deleteAllLaps());
        }
    };

    render() {
        const { laps, match, lastPaxClass } = this.props;
        const { time, paxClass } = this.state;

        return (
            <Page removeTopPadding>
                <HeaderOptions
                    title='PAX Calculator'
                    back={null}
                    right={null}
                />
                <Section>
                    <LapTimeInput
                        value={time}
                        onChange={(event) => {
                            const value = event.target.value;
                            this.setState({ time: value });
                        }}
                    />
                </Section>
                <Section removeMargin>
                    <TableGroup>
                        <TableRowSelect
                            label='Class'
                            value={paxClass || lastPaxClass}
                            onChange={(event) => {
                                const value = event.target.value;
                                this.setState({ paxClass: value });
                            }}
                            options={[
                                { label: 'Choose...', value: '' },
                                ...map(PAX_VALUES, ({ name, values }) => ({
                                    group: name,
                                    options: map(values, ({ name, pax }) => ({
                                        label: name,
                                        value: name,
                                    })),
                                })),
                            ]}
                        />
                    </TableGroup>
                </Section>

                <Collapse
                    open={time && (paxClass || lastPaxClass) ? true : false}
                >
                    <CalculatedTimes time={time} paxClass={paxClass} />

                    <Section>
                        <Button
                            label='Save Lap'
                            block
                            primary
                            onClick={this.handleSaveLapClick}
                        />
                    </Section>
                </Collapse>

                {laps.length ? (
                    <Section title='Saved Laps' removeMargin>
                        <TableGroup>
                            {map(laps, ({ time, id, date, paxClass }) => (
                                <TableFlexRow
                                    key={id}
                                    as={Link}
                                    to={`/edit-lap/${id}`}
                                >
                                    <TableFlexRowCell
                                        style={{ textAlign: 'left' }}
                                    >
                                        {paxClass}
                                    </TableFlexRowCell>
                                    <TableFlexRowCell
                                        flex='1'
                                        style={{ textAlign: 'right' }}
                                    >
                                        {time} <Icon path={mdiTimer} />
                                    </TableFlexRowCell>
                                    <TableFlexRowCell
                                        width='50%'
                                        style={{ textAlign: 'right' }}
                                    >
                                        <Text small light>
                                            <RelativeDate date={date} />
                                        </Text>
                                    </TableFlexRowCell>
                                </TableFlexRow>
                            ))}
                        </TableGroup>

                        <TableGroup>
                            <TableFlexRow
                                as={'button'}
                                type='button'
                                onClick={this.handleDeleteAllLapsButtonClick}
                            >
                                <TableFlexRowCell
                                    flex='1'
                                    style={{
                                        textAlign: 'center',
                                        color: OpenColor.red[9],
                                    }}
                                >
                                    Delete All Laps
                                </TableFlexRowCell>
                            </TableFlexRow>
                        </TableGroup>
                    </Section>
                ) : null}

                <Route path={match.url + `edit-lap/:id`}>
                    {(props) => (
                        <Modal
                            show={props.match ? true : false}
                            headerOptions={{
                                title: 'Edit Lap',
                                left: (
                                    <Button
                                        chromeless
                                        label='Done'
                                        as={Link}
                                        to={match.url}
                                    />
                                ),
                            }}
                        >
                            <EditLap
                                lap={
                                    props.match &&
                                    find(laps, { id: props.match.params.id })
                                }
                                onDone={() => {
                                    this.props.dispatch(
                                        replace({
                                            pathname: match.url,
                                        })
                                    );
                                }}
                            />
                        </Modal>
                    )}
                </Route>
            </Page>
        );
    }
}

@connect((state) => ({}))
class EditLap extends React.Component {
    static defaultProps = {
        lap: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            time: this.props.lap.time || '0.000',
            paxClass: this.props.lap.paxClass || '',
            date: this.props.lap.date || new Date().toString(),
        };
    }

    handleDeleteButtonClick = () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete the lap "${this.props.lap.time}"?`
        );
        if (confirmed) {
            this.props.dispatch(deleteLap(this.props.lap.id));
        }
        if (this.props.onDone) {
            this.props.onDone();
        }
    };

    render() {
        const { time, paxClass, date } = this.state;
        return (
            <Page>
                <Section>
                    <LapTimeInput
                        value={time}
                        onChange={(event) => {
                            const value = event.target.value;
                            this.setState({ time: value });
                        }}
                    />
                </Section>
                <Section removeMargin>
                    <TableGroup>
                        <TableRowSelect
                            label='Class'
                            value={paxClass}
                            onChange={(event) => {
                                const value = event.target.value;
                                this.setState({ paxClass: value });
                            }}
                            options={[
                                { label: 'Choose...', value: '' },
                                ...map(PAX_VALUES, ({ name, values }) => ({
                                    group: name,
                                    options: map(values, ({ name, pax }) => ({
                                        label: name,
                                        value: name,
                                    })),
                                })),
                            ]}
                        />
                    </TableGroup>
                </Section>
                <CalculatedTimes time={time} paxClass={paxClass} />

                <TableGroup>
                    <TableFlexRow
                        as={'button'}
                        type='button'
                        onClick={this.handleDeleteButtonClick}
                    >
                        <TableFlexRowCell
                            flex='1'
                            style={{
                                textAlign: 'center',
                                color: OpenColor.red[9],
                            }}
                        >
                            Delete Lap
                        </TableFlexRowCell>
                    </TableFlexRow>
                </TableGroup>
            </Page>
        );
    }
}
