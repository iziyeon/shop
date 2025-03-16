import { useState, useCallback } from 'react';
import { storage } from '@/utils/storage';

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(() => 
    storage.get('user')
  );

  const login = useCallback((userData: AuthUser) => {
    setUser(userData);
    storage.set('user', userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    storage.remove('user');
  }, []);

  return { user, login, logout };
};
