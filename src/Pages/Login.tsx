import {login} from '../Services/auth.service';
import Login from '../Components/Login';

const LoginScreen = () => {
    // Handler that matches FormEventHandler<HTMLFormElement>
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        await login(email, password);
    };

    return (
        <div>
            <Login 
                action={handleLogin}
            />
        </div>
    );
};

export default LoginScreen;