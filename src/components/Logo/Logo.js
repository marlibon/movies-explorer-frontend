import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'
import './Logo.css';

const Logo = () => {
    return (
        <Link to='/' className='logo'>
            <img src={logo} alt='логотип' className='logo__image' />
        </Link>
    )
}
export default Logo
