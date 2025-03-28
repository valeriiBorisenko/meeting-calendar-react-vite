import SectionTab from '../../../shared/SectionTab/SectionTab';
import TitleSection from '../../../shared/TitleSection/TitleSection';
import Form from './Form/Form';
import './schedule-meeting.css';
import { useForm } from 'react-hook-form';
import Table from './Table/Table';
import { Fragment, useState } from 'react';

const defaultValues = {
    id: 0,
    title: '',
    date: null,
    time: null,
    level: '',
    emails: '',
    description: ''
};

const ScheduleMeeting = () => {
    const [meeting, setMeeting] = useState([]);
    const [update, setUpdate] = useState(false);
    const [done, setDone] = useState(false);
    const { register, formState: { errors }, handleSubmit, setValue, reset, setError, clearErrors } = useForm({ defaultValues });

    const handleClickFormSubmitNew = () => {
        const id = meeting.length + 1;
        setValue('id', id);
      
        handleSubmit((value) => {
            setMeeting(prev => [...prev, value]);
            handleDone();
            resetForm();
        })();
    };

    const handleClickFormSubmitUpdate = () => {
        handleSubmit((value) => {
            const updateElement = meeting.find(item => item.id === value.id);

            const hasChanges = JSON.stringify(value) !== JSON.stringify(updateElement);

            if (hasChanges) {          
                setMeeting(meeting.map(item =>
                    item.id === value.id ? value : item
                ));
                handleDone();
                setUpdate(false);
                clearErrors('root');
                resetForm();
            } else {
                setError('root', {
                    type: 'manual',
                    message: 'No changes detected. Please update something before saving.',
                });
            }              
        })();
    };

    const handleClickDeleteMeeting = (id) => {
        setMeeting(meeting.filter(item => item?.id !== id));
    };

    const handleClickUpdateMeeting = (value) => {
        reset(value);
        setUpdate(true);
    };    
    
    const handleClickCancelUpdateMeeting = () => {
        resetForm();
        setUpdate(false);
    };

    const resetForm = () => {
        reset(defaultValues);
    };

    const handleDone = () => {
        setDone(true);
        setTimeout(() => setDone(false), 3000);
    };

    return (
        <div className='d-flex flex-column gap-4 w-100'>
            <SectionTab >
                {
                    update ?  
                        <Fragment>
                            <TitleSection title={'Schedule a Update Meeting'} icon={'bi-calendar3'}/>
                            <Form
                                register={register}
                                errors={errors}
                                handleClickFormSubmit={handleClickFormSubmitUpdate}
                                handleClickCancelUpdateMeeting={handleClickCancelUpdateMeeting}
                                update={update}
                                done={done}
                            /> 
                        </Fragment> :
                        <Fragment>
                            <TitleSection title={'Schedule a New Meeting'} icon={'bi-calendar3'}/>
                            <Form
                                register={register}
                                errors={errors}
                                handleClickFormSubmit={handleClickFormSubmitNew}
                                update={update}
                                done={done}
                            />
                        </Fragment>
                }
                
            </SectionTab>
            {
                meeting.length > 0 && 
                <SectionTab >
                    <h2 className="fs-3 m-0">List of Created Meetings</h2>
                    {meeting.length > 0 ? 
                        <Table 
                            meeting={meeting} 
                            handleClickDeleteMeeting={handleClickDeleteMeeting}
                            handleClickUpdateMeeting={handleClickUpdateMeeting}
                        /> : 
                        <p className='m-0'>No meetings scheduled yet...</p>
                    }
                </SectionTab>
            }
        </div>
    );
};

export default ScheduleMeeting;