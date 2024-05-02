import { useState, useEffect, useContext, createContext } from 'react';
import { firebaseAuth } from '../services/authService';

interface AuthContextType {
  user: firebase.User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await firebaseAuth.signInWithEmailAndPassword(email, password);
    setUser(response.user);
  };

  const logout = async () => {
    await firebaseAuth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};