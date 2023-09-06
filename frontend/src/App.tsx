import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from './app/hooks';
import { setUser } from './features/authSlice';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  useEffect(() => {
    dispatch(setUser(user))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
