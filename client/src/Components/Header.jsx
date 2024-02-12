import { Link } from 'react-router-dom';

const Header = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

    return (
        <header>
            <Link to='/'>Auth</Link>
            {currentUser && <Link to='/user'>{currentUser.login}</Link>}
        </header>
    )
}

export default Header;