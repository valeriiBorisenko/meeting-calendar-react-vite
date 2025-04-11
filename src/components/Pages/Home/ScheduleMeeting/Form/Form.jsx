// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import Inpunt from '../../../../shared/Inpunt/Input';
import { levels } from '../../constants';

const Form = (props) => {

    const { 
        register, 
        errors, 
        update, 
        handleClickFormSubmit, 
        handleClickCancelUpdateMeeting = () => {},
        done,
        watch
    } = props;

    return (
        <form className='d-flex flex-column gap-4' onSubmit={(e)=> {
            e.preventDefault();
            handleClickFormSubmit();
        }}>
            <input  type="hidden" {...register('id')} />
            <Inpunt 
                label={'Meeting Title'} 
                id={'title'} 
                register={{ ...register('title', { 
                    required: { value: true, message: 'Title is required' },
                    minLength: { value: 4, message: 'Title must be at least 4 characters long' }
                }) }}
                type={'text'}
                placeholder={'Enter meeting title'}
                errors={errors?.title}
            />
            <div className='row flex-column flex-md-row gap-4 gap-md-0'>
                <div className='col'>
                    <Inpunt
                        label={'Meeting Date'} 
                        id={'date'} 
                        register={{ 
                            ...register(
                                'date', 
                                { required: { value: true,message: 'Date is required' } }) }}
                        type={'date'}
                        errors={errors?.date}
                        min={new Date().toISOString().slice(0, 10)}
                    />
                </div>
                <div className='col'>
                    <Inpunt 
                        label={'Meeting Time'} 
                        id={'time'} 
                        register={{ ...register('time', { required: { value: true,message: 'Time is required' } }) }}
                        type={'time'}
                        errors={errors?.time}
                        min={
                            (() => {
                                const today = new Date();
                                
                                const selectedDate = new Date(watch('date'));
                                const isSameDay = selectedDate.toDateString() === today.toDateString();

                                if (isSameDay) {
                                    return today.toTimeString().slice(0, 5); 
                                }
                        
                                return undefined; 
                            })()
                        }
                    />
                </div>                  
            </div>
            <div className="form-group d-flex flex-column gap-2">
                <label htmlFor={'level'}>Meeting Level</label>
                <select 
                    className={`form-control ${errors?.level ? 'is-invalid' : ''}`} 
                    id={'level'}
                    {...register('level', { required: { value: true, message: 'Please choose the level' } })}
                >
                    <option disabled value="" >Choose level</option>
                    {levels.map(item => 
                        <option key={item} value={item} >{item}</option>
                    )}

                </select>
                {errors?.level && (
                    <p className='invalid-feedback m-0' role="alert">{errors?.level?.message}</p>
                )}
            </div>

            <Inpunt 
                label={'Participants'} 
                placeholder={'Enter participant emails'}
                id={'participantsEmails'}
                register={
                    { ...register('participantsEmails', {
                        required: { value: true, message: 'At least one email is required' },
                        pattern: {
                            value: /^([^\s@]+@[^\s@]+\.[^\s@]+)(\s*,\s*[^\s@]+@[^\s@]+\.[^\s@]+)*$/,
                            message: 'Use comma-separated valid emails. E.g. user@mail.com, test@mail.com.'
                        },
                        validate: {
                            noDuplicates: (value) => {
                                const emails = value
                                    .split(',')
                                    .map(email => email.trim().toLowerCase())
                                    .filter(Boolean);
                                const uniqueEmails = new Set(emails);
                                return emails.length === uniqueEmails.size || 'Duplicate emails are not allowed';
                            }
                        }
                    }) 
                    }}
                type={'text'}
                errors={errors?.participantsEmails}
            />
            <div className="form-group d-flex flex-column gap-2">
                <label htmlFor={'description'}>Description</label>
                <textarea 
                    id='description' 
                    className='form-control' 
                    {...register('description')}
                />
            </div>
            <div className='d-flex flex-column gap-2'>
                <div className='d-flex flex-column flex-md-row gap-4'>
                    <motion.button 
                        type="submit" 
                        className="btn d-flex gap-2 align-items-center justify-content-center w-max-content text-white border-0"
                        animate={{
                            backgroundColor: Object.keys(errors).length ? '#dc3545' : done ? '#198754' : '#0d6efd'
                        }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        { done ? <motion.i
                            style={{ fontSize: '1.2rem' }}
                            className="bi bi-check2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        /> : 
                            <i className="bi bi-plus" style={{ fontSize: '1.2rem' }} /> }
                        <p className='m-0'><strong>{done ? 'Done' : update ? 'Update Meeting' : 'Create Meeting'}</strong></p>
                    </motion.button>
                    {
                        update &&
                    <button onClick={handleClickCancelUpdateMeeting} type="button" className="btn btn-danger d-flex gap-2 align-items-center justify-content-center w-max-content" >
                        <i className="bi bi-x" style={{ fontSize: '1.2rem' }} />
                        <p className='m-0'><strong>Cancel</strong></p>
                    </button>
                    }
                </div>
                
                {errors?.root && (
                    <p className='invalid-feedback m-0  d-block' role="alert">{errors?.root?.message}</p>
                )}
            </div>
        </form>
    );
};

export default Form;