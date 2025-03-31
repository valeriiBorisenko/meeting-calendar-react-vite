// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'motion/react';
import { tableTitle } from '../../constants';

const TableMobile = (props) => {

    const { meeting, handleClickDeleteMeeting, handleClickUpdateMeeting } = props;

    return (
        <div className='d-flex flex-column gap-3'>
            <AnimatePresence>
                {
                    meeting?.map((item, index) =>
                        <motion.div 
                            key={`meeting-list${index + 1}`}
                            className={`d-flex gap-2 justify-content-between ${index === meeting?.length - 1 ? '' : 'border-bottom pb-4'}`}
                            initial={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className='d-flex flex-column gap-2'>
                                {
                                    tableTitle.map(item => 
                                        <p className='p-0 m-0'><b>{item}</b></p>
                                    )
                                }
                            </div>
                            
                            <div className='d-flex flex-column gap-2 align-items-end'>
                                <p className="p-0 m-0">{index + 1}</p>
                                <p className="p-0 m-0">{item?.title}</p>
                                <p className="p-0 m-0">{item?.date}</p>
                                <p className="p-0 m-0">{item?.time}</p>
                                <p className="p-0 m-0">{item?.level}</p>
                                <div className='d-flex gap-2'>
                                    <button className='btn bg-warning' onClick={() => handleClickUpdateMeeting(item)}>
                                        <i  className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className='btn bg-danger text-white' onClick={() => handleClickDeleteMeeting(item?.id)}>
                                        <i  className="bi bi-trash-fill"></i>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )
                        
                }
            </AnimatePresence>
        </div>
        
    );
};

export default TableMobile;