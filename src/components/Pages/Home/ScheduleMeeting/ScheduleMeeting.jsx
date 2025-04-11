import SectionTab from '../../../shared/SectionTab/SectionTab';
import TitleSection from '../../../shared/TitleSection/TitleSection';
import Form from './Form/Form';
import './schedule-meeting.css';
import { useForm } from 'react-hook-form';
import Table from './Table/Table';
import { Fragment, useContext, useEffect, useState } from 'react';
import { RootWidthContext } from '../../../../utils/context';
import TableMobile from './Table/TableMobile';
import axiosRequest from '../../../../utils/hook/axiosRequestHook';

const defaultValues = {
    id: 0,
    title: '',
    date: null,
    time: null,
    level: '',
    participantsEmails: '',
    description: ''
};

const ScheduleMeeting = () => {
    const width = useContext(RootWidthContext);
    const [meeting, setMeeting] = useState([]);
    const [update, setUpdate] = useState(false);
    const [done, setDone] = useState(false);
    const { register, formState: { errors }, handleSubmit, reset, watch, setError, clearErrors } = useForm({ defaultValues });

    const handleClickFormSubmitNew = () => {    
        handleSubmit((value) => {

            const dataBody = {
                title: value?.title,
                date: value?.date,
                time: value?.time,
                level: value?.level,
                participantsEmails: value?.participantsEmails
            };

            if (value?.description !== '') {
                dataBody['description'] = value?.description;
            }

            axiosRequest({
                method: 'POST',
                url: '/meetings',
                data: dataBody,
                callback: (props) => {
                    if (!props?.error) {
                        setMeeting(prev => [...prev, value]);
                        callMeetingsApi();
                        handleDone();
                        resetForm();
                    }
                }
            });
        })();
    };

    useEffect(()=>{
        console.log(meeting);
    },[meeting]);

    const handleClickFormSubmitUpdate = () => {
        handleSubmit((value) => {
            const updateElement = meeting.find(item => item.id === value.id);

            const hasChanges = JSON.stringify(value) !== JSON.stringify(updateElement);

            if (hasChanges) {    
                const dataBody = {
                    id: value?.id,
                    title: value?.title,
                    date: value?.date,
                    time: value?.time,
                    level: value?.level,
                    participantsEmails: value?.participantsEmails
                };
    
                if (value?.description !== '') {
                    dataBody['description'] = value?.description;
                }
    
                axiosRequest({
                    method: 'PUT',
                    url: '/meetings',
                    data: dataBody,
                    callback: (props) => {
                        if (!props?.error) {
                            setMeeting(meeting.map(item =>
                                item.id === value.id ? value : item
                            ));
                            handleDone();
                            setUpdate(false);
                            callMeetingsApi();
                            resetForm();
                            clearErrors('root');
                        }
                    }
                });
            } else {
                setError('root', {
                    type: 'manual',
                    message: 'No changes detected. Please update something before saving.',
                });
            }              
        })();
    };

    const handleClickDeleteMeeting = (id) => {
        axiosRequest({
            method: 'DELETE',
            url: `/meetings/${id}`,
            callback: (props) => {
                if (!props?.error) {
                    setMeeting(meeting.filter(item => item?.id !== id));
                    callMeetingsApi();
                    resetForm();
                }
            }
        });
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

    const callMeetingsApi  = () => {
        axiosRequest({
            method: 'GET',
            url: '/meetings',
            callback: (data)=> setMeeting(data),
        });
    };

    useEffect(() => {
        callMeetingsApi();
    },[]);

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
                                watch={watch}
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
                                watch={watch}
                            />
                        </Fragment>
                }
                
            </SectionTab>
            {
                meeting.length > 0 && 
                <SectionTab >
                    <h2 className="fs-3 m-0">List of Created Meetings</h2>
                    {meeting.length > 0 ? 
                        ( width >= 576 ?
                            <Table 
                                meeting={meeting} 
                                handleClickDeleteMeeting={handleClickDeleteMeeting}
                                handleClickUpdateMeeting={handleClickUpdateMeeting}
                            /> : 
                            <TableMobile 
                                meeting={meeting} 
                                handleClickDeleteMeeting={handleClickDeleteMeeting}
                                handleClickUpdateMeeting={handleClickUpdateMeeting}
                            />) :
                        <p className='m-0'>No meetings scheduled yet...</p>
                    }
                </SectionTab>
            }
        </div>
    );
};

export default ScheduleMeeting;