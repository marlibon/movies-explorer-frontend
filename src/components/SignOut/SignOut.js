import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const SignOut = ({ onLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        onLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/signin', { replace: true });

    }, [])
    return (
        <div>выходим...</div>
    )
}
export default SignOut
