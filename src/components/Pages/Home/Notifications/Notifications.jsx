import InProgress from '../../../shared/InProgress/InProgress';
import SectionTab from '../../../shared/SectionTab/SectionTab';
import './notifications.css';

const Notifications = () => {

    return (
        <SectionTab className={'align-items-center justify-content-center'}>
            <InProgress />
        </SectionTab>
    );
};

export default Notifications;