import InProgress from '../../../shared/InProgress/InProgress';
import SectionTab from '../../../shared/SectionTab/SectionTab';
import './manage-meetings.css';

const ManageMeetings = () => {
    return (
        <SectionTab className={'align-items-center justify-content-center'}>
            <InProgress />
        </SectionTab>
    );
};

export default ManageMeetings;