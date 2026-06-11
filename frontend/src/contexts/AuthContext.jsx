import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage synchronously to avoid flash
    const stored = localStorage.getItem('foodsaver_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('foodsaver_token'));
  const [loading, setLoading] = useState(true);
  const isManualAuth = useRef(false);

  // Only run on mount to validate existing session
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('foodsaver_token');
      const savedUser = localStorage.getItem('foodsaver_user');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } else if (savedToken) {
        try {
          const userData = await authService.getMe();
          if (userData) {
            setUser(userData);
            localStorage.setItem('foodsaver_user', JSON.stringify(userData));
          } else {
            // Invalid token
            localStorage.removeItem('foodsaver_token');
            localStorage.removeItem('foodsaver_user');
            setToken(null);
            setUser(null);
          }
        } catch {
          localStorage.removeItem('foodsaver_token');
          localStorage.removeItem('foodsaver_user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []); // Only run on mount, NOT on token change

  const login = useCallback(async (email, password) => {
    const result = await authService.login(email, password);
    const { user: userData, token: authToken } = result;

    // Save to localStorage first
    localStorage.setItem('foodsaver_token', authToken);
    localStorage.setItem('foodsaver_user', JSON.stringify(userData));

    // Update state - these will batch and trigger a single re-render
    isManualAuth.current = true;
    setToken(authToken);
    setUser(userData);
    setLoading(false);

    return userData;
  }, []);

  const register = useCallback(async (userData) => {
    const result = await authService.register(userData);
    const { user: newUser, token: authToken } = result;

    localStorage.setItem('foodsaver_token', authToken);
    localStorage.setItem('foodsaver_user', JSON.stringify(newUser));

    isManualAuth.current = true;
    setToken(authToken);
    setUser(newUser);
    setLoading(false);

    return newUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('foodsaver_token');
    localStorage.removeItem('foodsaver_user');
    setUser(null);
    setToken(null);
  }, []);

  const updateUser = useCallback((userData) => {
    setUser(prev => {
      const updated = { ...prev, ...userData };
      localStorage.setItem('foodsaver_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
