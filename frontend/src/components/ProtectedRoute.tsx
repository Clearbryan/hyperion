import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectAuth } from '../features/authSlice';
import Auth from '../pages/Auth';

function ProtectedRoute({children}: { children: any}) {
  const { token } = useSelector(selectAuth)
  return token ? children : <Auth />
}

export default ProtectedRoute;