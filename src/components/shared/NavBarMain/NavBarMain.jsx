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
        <nav className="navbar-main bg-white shadow-sm rounded min-w-min-content h-min-content position-sticky-sm top-3">
            { width >= 768 ? 
                <div className="rounded-top d-flex flex-row align-items-center justify-content-center bg-dark text-white d-flex p-1 p-md-5 pt-md-3 pb-md-3">
                    <i className="bi bi-speedometer2" style={{ fontSize: '2rem' }}/>
                    <h3 className="m-0 ms-3 text-center">Dashboard</h3>
                </div> : 
                <button className={`btn btn-dark w-100 rounded-0 rounded-top ${width < 576 && !show ? 'rounded-bottom' : ''} d-flex flex-row align-items-center justify-content-center bg-dark text-white p-1 p-md-5 pt-md-3 pb-md-3`}
                    onClick={handleClickShow}
                >
                    <i className="bi bi-speedometer2" style={{ fontSize: '2rem' }}/>
                    {
                        width < 576 ?
                            <motion.h3
                                className="m-0 ms-3 text-center"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.5 }}
                            >
                            Dashboard
                            </motion.h3> :
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
                </button>
            }
            
            <motion.ul
                className="list-group overflow-hidden rounded-0"
                initial={false}
                animate={
                    width < 576
                        ? (show ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 })
                        : { opacity: 1, height: 'auto' }
                }
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
            >
                {sideBarMenu?.map((item, index) =>
                    <li 
                        className={`list-group-item list-group-item-action btn rounded-0 d-flex flex-row align-items-center justify-content-md-start ${show ? 'justify-content-start' : 'justify-content-center'} ${activeTab === item?.tab ? 'active' : ''} ${index === sideBarMenu?.length - 1 ? 'rounded-bottom' : ''}`} 
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
            </motion.ul>
        </nav>
    );
};

export default NavBarMain;