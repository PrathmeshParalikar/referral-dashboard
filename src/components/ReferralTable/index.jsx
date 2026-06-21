import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import formatDate from '../../utils/formatDate'
import formatCurrency from '../../utils/formatCurrency'

import './index.css'

const ReferralTable = ({
  referrals,
  searchInput,
  setSearchInput,
  sortOrder,
  setSortOrder,
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const ITEMS_PER_PAGE = 10

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  const currentReferrals = referrals.slice(startIndex, endIndex)

  const totalPages = Math.ceil(referrals.length / ITEMS_PER_PAGE)

  const navigate = useNavigate()

  useEffect(() => {
    setCurrentPage(1)
  }, [searchInput, sortOrder])

  if (referrals.length === 0) {
    return (
      <div className="referral-table-wrapper">
        <h2 className="table-title">All referrals</h2>
        <p>No referrals found</p>
      </div>
    )
  }

  return (
    <div className="referral-table-wrapper">

      <h2 className="table-title">
        All referrals
      </h2>

      <div className="table-controls">

        <div className="search-group">
          <label className="search-label">
            Search
          </label>

          <input
            type="search"
            placeholder="Name or service..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="sort-group">
          <span className="sort-label">
            Sort by date
          </span>

          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="desc">
              Newest first
            </option>

            <option value="asc">
              Oldest first
            </option>
          </select>
        </div>

      </div>

      <div className="table-container">
        <table className="referrals-table">

          <thead>
            <tr>
              <th>NAME</th>
              <th>SERVICE</th>
              <th>DATE</th>
              <th>PROFIT</th>
            </tr>
          </thead>

          <tbody>

            {currentReferrals.map(item => (
              <tr
                key={item.id}
                onClick={() =>
                  navigate(`/referrals/${item.id}`)
                }
                className="table-row"
              >
                <td>{item.name}</td>

                <td>{item.serviceName}</td>

                <td>
                  {formatDate(item.date)}
                </td>

                <td className="profit-cell">
                  {formatCurrency(item.profit)}
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>

      <div className="pagination-section">

        <p className="entries-text">
          Showing {startIndex + 1}–
          {Math.min(endIndex, referrals.length)}
          {' '}
          of {referrals.length} entries
        </p>

        <div className="pagination-buttons">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(prev => prev - 1)
            }
            className="page-btn"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() =>
                setCurrentPage(index + 1)
              }
              className={
                currentPage === index + 1
                  ? 'page-btn active-page'
                  : 'page-btn'
              }
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(prev => prev + 1)
            }
            className="page-btn"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  )
}

export default ReferralTable