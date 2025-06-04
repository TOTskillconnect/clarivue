import { useState, useCallback } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { id: string; email: string };
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = useCallback(async (email: string, password: string) => {
    // Implement login logic here
    try {
      // API call would go here
      setAuthState({ isAuthenticated: true, user: { id: '1', email } });
    } catch (error) {
      console.error('Login failed:', error);
    }
  }, []);

  const logout = useCallback(() => {
    setAuthState({ isAuthenticated: false, user: null });
  }, []);

  return {
    ...authState,
    login,
    logout,
  };
}; 