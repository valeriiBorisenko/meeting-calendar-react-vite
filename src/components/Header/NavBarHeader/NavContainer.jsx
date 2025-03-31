import { NavLink } from 'react-router-dom';
import { navBarHeader } from '../../../constants';


const NavContainer = () => {

    return (
        <ul className="navbar-nav mr-auto">
            {navBarHeader.map((item, index) =>
                <li key={`navBarHeader-${index}`} className={'nav-item '}>
                    <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={item?.link} end>{item?.name}</NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavContainer;