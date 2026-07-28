import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

export function useMeals(path = '/meals') {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => { setLoading(true); setError(''); try { const data = await api(path); setMeals(data.meals); } catch (requestError) { setError(requestError.message); } finally { setLoading(false); } }, [path]);
  useEffect(() => { refresh(); }, [refresh]);
  return { meals, setMeals, loading, error, refresh };
}
