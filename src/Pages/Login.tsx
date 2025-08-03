import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Login from '../Components/Login';

const LoginScreen = () => {
    const { login, isLoading, error } = useAuth();
    const [notification, setNotification] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        
        console.log('🔍 Datos del formulario:', { username, password });
        
        if (!username || !password) {
            console.error('❌ Username o password vacíos');
            return;
        }
        
        try {
            console.log('🚀 Iniciando login...');
            const response = await login(username, password);
            console.log('✅ Login exitoso, respuesta:', response);
            
            setNotification('¡Inicio de sesión exitoso!');
            
            // Verificar el rol del usuario
            console.log('👤 Rol del usuario:', response.user.rol);
            
            // Redirigir inmediatamente sin setTimeout para debugging
            if (response.user.rol === 'admin' || response.user.rol === 'administrador') {
                console.log('📍 Redirigiendo a categorias...');
                navigate('/categorias/registro', { replace: true });
            } else {
                console.log('📍 Redirigiendo a dashboard...');
                navigate('/dashboard', { replace: true });
            }
            
        } catch (error: unknown) {
            console.error('💥 Error en handleLogin:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md">
                {error && (
                    <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded-lg">
                        {error}
                    </div>
                )}
                {notification && (
                    <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-300 rounded-lg">
                        {notification}
                    </div>
                )}
                {isLoading && (
                    <div className="mb-4 p-4 text-blue-700 bg-blue-100 border border-blue-300 rounded-lg">
                        Iniciando sesión...
                    </div>
                )}
                <Login 
                    action={handleLogin}
                />
            </div>
        </div>
    );
};

export default LoginScreen;