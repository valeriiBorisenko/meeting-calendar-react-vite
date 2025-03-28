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
                                key={`meeting-list${index + 1}`}
                                initial={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <th scope="row">{index + 1}</th>
                                <td>{item?.title}</td>
                                <td>{item?.date}</td>
                                <td>{item?.time}</td>
                                <td>{item?.level}</td>
                                <td className='d-flex gap-1'>
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