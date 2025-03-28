import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { RootWidthContext } from '../../../utils/context';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const NavBarMain = (props) => {
    const { sideBarMenu, handleClickSideTab, activeTab } = props;
    const width = useContext(RootWidthContext);
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (width < 768) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [width]);

    const handleClickShow = () => {
        setShow(!show);
    };

    return (
        <nav className="bg-white shadow-sm rounded overflow-hidden min-w-min-content h-min-content position-sticky top-5">
            <div className="d-flex flex-row align-items-center justify-content-center bg-dark text-white d-flex p-1 p-md-5 pt-md-3 pb-md-3">
                {
                    width < 768 ?
                        <button className='btn btn-dark p-0' onClick={handleClickShow}>
                            <i className="bi bi-speedometer2" style={{ fontSize: '2rem' }}/>
                        </button> :
                        <i className="bi bi-speedometer2" style={{ fontSize: '2rem' }}/>
                        
                }
                {
                    show && 
                        <motion.h3
                            className="m-0 ms-3 text-center"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.5 }}
                        >
                            Dashboard
                        </motion.h3>
                }
                
            </div>
            <ul className="list-group">
                {sideBarMenu?.map(item =>
                    <li 
                        className={`list-group-item list-group-item-action btn rounded-0 d-flex flex-row align-items-center justify-content-md-start ${show ? 'justify-content-start' : 'justify-content-center'} ${activeTab === item?.tab ? 'active' : ''}`} 
                        key={`sidebar-${item?.name}`} 
                        onClick={()=> {
                            handleClickSideTab(item?.tab);
                            if (width < 768 && show) {
                                handleClickShow();
                            }  
                        }}
                    >
                        <i className={`bi ${item?.icon}`} style={{ fontSize: '1.2rem' }} />
                        {
                            show && 
                        <motion.p
                            className="m-0 ms-2 text-nowrap"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.5 }}
                        >
                            {item.name}
                        </motion.p>
                        }
                        
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavBarMain;