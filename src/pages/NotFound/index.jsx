import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1>404</h1>

    <h2>Page Not Found</h2>

    <p>
      The page you are looking for does not exist.
    </p>

    <Link to="/">
      <button type="button">
        Back to Dashboard
      </button>
    </Link>
  </div>
)

export default NotFound