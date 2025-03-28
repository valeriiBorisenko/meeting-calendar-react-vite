import { useState } from 'react';
import { AnimatePresence } from 'motion/react';

import './home.css';

import { sideBarMenu } from './constants';

import NavBarMain from '../../shared/NavBarMain/NavBarMain';
import ScheduleMeeting from './ScheduleMeeting/ScheduleMeeting';
import ManageMeetings from './ManageMeetings/ManageMeetings';
import UserAndPermissions from './UsersAndPermissions/UsersAndPermissions';
import Notifications from './Notifications/Notifications';
import Analytics from './Analytics/Analytics';
import Settings from './Settings/Settings';
import Main from '../../Main/Main';

// tab: 'schedule',
// tab: 'manage',
// tab: 'users',
// tab: 'notifications',
// tab: 'analytics',
// tab: 'settings',

const Home = () => {
    const [activeTab, setActiveTab] = useState(sideBarMenu[0]?.tab);

    const handleClickSideTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Main>
            <NavBarMain 
                sideBarMenu={sideBarMenu} 
                handleClickSideTab={handleClickSideTab} 
                activeTab={activeTab}
            />
            <AnimatePresence mode="wait">
                {activeTab === 'schedule' && <ScheduleMeeting />}
                {activeTab === 'manage' && <ManageMeetings />}
                {activeTab === 'users' && <UserAndPermissions />}
                {activeTab === 'notifications' && <Notifications />}
                {activeTab === 'analytics' && <Analytics />}
                {activeTab === 'settings' && <Settings />}
            </AnimatePresence>
        </Main>
    );
};

export default Home;