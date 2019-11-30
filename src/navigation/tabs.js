import React from 'react';
import { NavLink } from 'react-router-dom';
import { mdiHome, mdiSchool, mdiTune, mdiMagnify } from '@mdi/js';
import { connect } from 'react-redux';

import Icon from '../components/icon';
import { Tab, TabBar } from '../components/tab-bar';

@connect((state) => ({}))
export class Tabs extends React.Component {
    render() {
        //const { alert, academicAlerts } = this.props;

        return (
            <TabBar>
                <Tab
                    as={NavLink}
                    to='/'
                    icon={<Icon path={mdiHome} />}
                    label={'Home'}
                    // isActive={(match, location) => {
                    //     const { pathname } = location;
                    //     if (
                    //         pathname.indexOf('/shortcuts') !== -1 ||
                    //         pathname.indexOf('/weekly-schedule') == 0 ||
                    //         pathname === '/'
                    //     ) {
                    //         return true;
                    //     }

                    //     return false;
                    // }}
                />
                <Tab
                    as={NavLink}
                    to='/academics'
                    icon={<Icon path={mdiSchool} />}
                    label={'Academics'}
                />
                <Tab
                    as={NavLink}
                    to='/search'
                    icon={<Icon path={mdiMagnify} />}
                    label={'Search'}
                />
                <Tab
                    as={NavLink}
                    to='/settings'
                    icon={<Icon path={mdiTune} />}
                    label={'Settings'}
                />
            </TabBar>
        );
    }
}
