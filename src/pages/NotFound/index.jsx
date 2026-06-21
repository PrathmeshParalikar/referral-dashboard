import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-page">

    <div className="not-found-content">

      <h1 className="error-code">
        404
      </h1>

      <h2 className="error-title">
        Page not found
      </h2>

      <Link
        to="/"
        className="back-link"
      >
        Back to dashboard
      </Link>

    </div>

  </div>
)

export default NotFound