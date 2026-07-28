import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState('');
  useEffect(() => { api('/auth/me').then(({ user: currentUser }) => setUser(currentUser)).catch(() => setUser(null)); }, []);
  const logout = async () => { try { await api('/auth/logout', { method: 'POST' }); } catch (logoutError) { setError(logoutError.message); } finally { setUser(null); } };
  return <AuthContext.Provider value={{ user, setUser, logout, error }}>{children}</AuthContext.Provider>;
}
AuthProvider.propTypes = { children: PropTypes.node.isRequired };
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used within AuthProvider.'); return context; }
