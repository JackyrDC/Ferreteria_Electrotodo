import type { FormEventHandler } from 'react';

const LoginPage = ({ action }: { action: FormEventHandler<HTMLFormElement> }) => {
    return (
<div className="w-full max-w-sm p-8 bg-white border border-gray-500 rounded-lg shadow-lg ">
    <form className="space-y-6" onSubmit={action} method='post'>
        <div className="text-center mb-6">
            <h5 className="text-2xl font-bold text-gray-900  mb-2">Bienvenido</h5>
            <p className="text-sm text-gray-600">Inicia sesión en tu cuenta</p>
        </div>
        
        <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                Nombre de usuario
            </label>
            <input 
                type="text" 
                name="username" 
                id="username" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 block w-full p-3  transition-colors duration-200" 
                placeholder="Ingresa tu nombre de usuario" 
                required 
            />
        </div>
        
        <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contraseña
            </label>
            <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="••••••••" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 block w-full p-3 transition-colors duration-200" 
                required 
            />
        </div>
        
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <input 
                    id="remember" 
                    type="checkbox" 
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-red-600 dark:ring-offset-gray-800" 
                    style={{ accentColor: '#D71B07' }}
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-900 dark:text-gray-300">
                    Recordarme
                </label>
            </div>
            <a 
                href="#" 
                className="text-sm hover:underline transition-colors duration-200" 
                style={{ color: '#D71B07' }}
            >
                ¿Olvidaste tu contraseña?
            </a>
        </div>
        
        <button 
            type="submit" 
            className="w-full text-white font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] focus:ring-4 focus:outline-none"
            style={{ 
                backgroundColor: '#D71B07'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B01505'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#D71B07'}
        >
            Iniciar sesión
        </button>
        
        <div className="text-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
                ¿No tienes cuenta? 
            </span>
            <a 
                href="#" 
                className="text-sm font-medium hover:underline ml-1 transition-colors duration-200" 
                style={{ color: '#D71B07' }}
            >
                Regístrate aquí
            </a>
        </div>
    </form>
</div>
    );
}

export default LoginPage;