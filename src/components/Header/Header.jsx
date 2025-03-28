import './header.css';
import NavBarHeader from './NavBarHeader/NavBarHeader';

const Header = () => {

    return (
        <header className="header bg-dark">
            <div className="container">
                <NavBarHeader />
            </div>
        </header>
    );
};

export default Header;