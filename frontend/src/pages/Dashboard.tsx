import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router-dom'
import { selectAuth, logout } from '../features/authSlice'

function Dashboard() {
    const dispatch = useAppDispatch()
    const navigate= useNavigate()
    const { username, emailAddress } = useAppSelector(selectAuth)
    const userLogout = () => {
        dispatch(logout())
        navigate('/auth')
        
    }
  return (
    <section className="container my-5">
      <div className="bg-body-tertiary p-5 rounded">
        <p className="lead">
          Welcome to Hyperion Dev {username}. We are so excited about your
          journey with us.
        </p>
        Your account details are: <br />
        Email: <strong className="text-primary">{emailAddress}</strong>
        <br />
        Username: <strong className="text-primary">{username}</strong>
        <hr />
        <button
          onClick={() => userLogout()}
          className="btn btn-outline-danger btn-lg custom-btn"
          type="button"
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default Dashboard