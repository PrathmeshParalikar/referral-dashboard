import {useNavigate} from 'react-router-dom'
import './index.css'

const Navbar = ({onLogout}) => {
  const navigate = useNavigate()

  return (
    <nav className="navbar">

      <h1
        className="navbar-logo"
        onClick={() => navigate('/')}
      >
        Go Business
      </h1>

      <div className="navbar-actions">

        <button
          type="button"
          className="trial-button"
        >
          Try for free
        </button>

        <button
          type="button"
          className="logout-button"
          onClick={onLogout}
        >
          Log out
        </button>

      </div>

    </nav>
  )
}

export default Navbar