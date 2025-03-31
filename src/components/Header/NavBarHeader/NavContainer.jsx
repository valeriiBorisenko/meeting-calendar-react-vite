import { NavLink } from 'react-router-dom';
import { navBarHeader } from '../../../constants';


const NavContainer = () => {

    console.log(window.location.pathname);

    return (
        <ul className="navbar-nav mr-auto">
            {navBarHeader.map((item, index) =>
                <li key={`navBarHeader-${index}`} className={'nav-item '}>
                    <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                        to={item?.link} 
                        end={item.link === '/meeting-calendar-react-vite/'}
                    >
                        {item?.name}
                    </NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavContainer;