import { useContext, useState } from 'react';
import './navbar-header.css';
import { NavLink, useLocation } from 'react-router-dom';
import NavContainer from './NavContainer';

// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'motion/react';
import { RootWidthContext } from '../../../utils/context';


const NavBarHeader = () => {
    const location = useLocation();
    const width = useContext(RootWidthContext);
    const [toggle, setToggle] = useState(false);

    const handleClickToggle = () => {
        setToggle(!toggle);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <i className="navbar-brand text-light bi bi-calendar2-week" style={{ fontSize: '2rem' }} />
            <button className="navbar-toggler" 
                type="button" 
                onClick={handleClickToggle}
                aria-controls="navBarHeader" 
                aria-label="Toggle header navigation"
            >
                <i className="navbar-toggler-icon" style={{ fontSize: '1rem' }}/>
            </button>
            
            <AnimatePresence>
                {   toggle && width < 992 && 
                    <motion.div
                        className={`collapse navbar-collapse ${toggle ? 'show': ''}`} 
                        id="navBarHeader"
                        initial={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <NavContainer toggle={toggle} location={location} />
                    </motion.div>
                }
                {
                    width >= 992 &&
                    <NavContainer toggle={toggle} location={location} />
                }
            </AnimatePresence>
        </nav>
    );
};

export default NavBarHeader;