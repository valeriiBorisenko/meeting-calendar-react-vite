import { NavLink } from 'react-router-dom';
import { navBarHeader } from '../../../constants';


const NavContainer = (props) => {

    const { location } = props;

    return (
        <ul className="navbar-nav mr-auto">
            {navBarHeader.map((item, index) =>
                <li key={`navBarHeader-${index}`} className={'nav-item '}>
                    <NavLink className={`nav-link ${location.pathname === item?.link ? 'active' : ''}`} to={item?.link}>{item?.name}</NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavContainer;