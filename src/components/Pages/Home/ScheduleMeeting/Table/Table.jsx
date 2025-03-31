// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'motion/react';
import { tableTitle } from '../../constants';

const Table = (props) => {

    const { meeting, handleClickDeleteMeeting, handleClickUpdateMeeting } = props;

    return (
        <table className="table">
            <thead>
                <tr>
                    {tableTitle.map(item => 

                        <th key={item} scope="col">{item}</th>
                        
                    )}
                </tr>
            </thead>
            <tbody>
                <AnimatePresence>
                    {
                        meeting?.map((item, index) =>
                            <motion.tr 
                                className='border-bottom'
                                key={`meeting-list${index + 1}`}
                                initial={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
                                animate={{ opacity: 1, height: '100%' }}
                                exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <th className='border-0' scope="row">{index + 1}</th>
                                <td className='border-0'>{item?.title}</td>
                                <td className='border-0'>{item?.date}</td>
                                <td className='border-0'>{item?.time}</td>
                                <td className='border-0'>{item?.level}</td>
                                <td className='d-flex gap-1 border-0'>
                                    <button className='btn bg-warning' onClick={() => handleClickUpdateMeeting(item)}>
                                        <i  className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className='btn bg-danger text-white' onClick={() => handleClickDeleteMeeting(item?.id)}>
                                        <i  className="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </motion.tr>
                        )
                    }
                </AnimatePresence>
            </tbody>
        </table>
    );
};

export default Table;