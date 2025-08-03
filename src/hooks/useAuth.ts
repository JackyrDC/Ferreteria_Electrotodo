import { useState, useEffect } from 'react';
import { login as loginService } from '../Services/auth.service';
import type { Users } from '../Types/types';

interface AuthState {
  user: Users | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isInitialized: false,
  });

  // Usar un useEffect que solo se ejecute una vez
  useEffect(() => {
    let isMounted = true; // Flag para evitar actualizaciones si el componente se desmonta
    
    const initializeAuth = () => {
      console.log('🔄 Inicializando useAuth...');
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (savedToken && savedUser) {
        try {
          const user = JSON.parse(savedUser);
          console.log('📱 Sesión recuperada:', { token: !!savedToken, user: user.rol });
          
          if (isMounted) {
            setAuthState({
              user,
              token: savedToken,
              isLoading: false,
              error: null,
              isInitialized: true,
            });
          }
        } catch (error) {
          console.error('❌ Error parsing saved user:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          if (isMounted) {
            setAuthState(prev => ({ 
              ...prev, 
              isInitialized: true 
            }));
          }
        }
      } else {
        console.log('📭 No hay sesión guardada');
        if (isMounted) {
          setAuthState(prev => ({ 
            ...prev, 
            isInitialized: true 
          }));
        }
      }
    };

    // Solo inicializar si no está ya inicializado
    if (!authState.isInitialized) {
      initializeAuth();
    }

    return () => {
      isMounted = false; // Cleanup para evitar memory leaks
    };
  }, []); // Array vacío para que solo se ejecute una vez

  const login = async (username: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await loginService(username, password);
      console.log('🎯 Login service response:', response);
      
      const newState = {
        user: response.user,
        token: response.token,
        isLoading: false,
        error: null,
        isInitialized: true,
      };
      
      console.log('💾 Guardando estado:', newState);
      setAuthState(newState);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error: unknown) {
      console.error('💥 Error en login:', error);
      interface AuthError {
        msg?: string;
        message?: string;
      }
      let errorMessage = 'Error al iniciar sesión';
      if (typeof error === 'object' && error !== null) {
        const err = error as { errores?: AuthError[]; message?: string };
        if (err.errores) {
          errorMessage = err.errores.map((e: AuthError) => e.msg || e.message).join(', ');
        } else if (err.message) {
          errorMessage = err.message;
        }
      }
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isInitialized: true,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return {
    ...authState,
    login,
    logout,
  };
};