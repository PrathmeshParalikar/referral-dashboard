import {useParams, useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import Cookies from "js-cookie"

import formatDate from "../../utils/formatDate"
import formatCurrency from "../../utils/formatCurrency"
import Navbar from "../../components/Navbar"

import "./index.css"

const ReferralDetails = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [details, setDetails] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = async () => {
    const token = Cookies.get("jwt_token")

    const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      setDetails(data.data)
    } else {
      setErrorMsg(data.message)
    }
  }

  if (details === null) {
    return <p>Loading...</p>
  }

  if (errorMsg) {
    return <h1>{errorMsg}</h1>
  }

  const referralDetails = details.referrals[0]

  const onLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
}

  return (
    <>

    <Navbar onLogout={onLogout} />

    <div className="details-page">

      <button
        type="button"
        className="back-link"
        onClick={() => navigate("/")}
      >
        ← Back to dashboard
      </button>

      <h1 className="details-title">
        Referral Details
      </h1>

      <p className="details-subtitle">
        Full information for this referral partner.
      </p>

      <div className="details-card">

        <div className="card-header">

          <h2 className="person-name">
            {referralDetails.name}
          </h2>

          <span className="service-badge">
            {referralDetails.serviceName}
          </span>

        </div>

        <div className="details-row">
          <span className="label">
            REFERRAL ID
          </span>

          <span className="value">
            {referralDetails.id}
          </span>
        </div>

        <div className="details-row">
          <span className="label">
            NAME
          </span>

          <span className="value">
            {referralDetails.name}
          </span>
        </div>

        <div className="details-row">
          <span className="label">
            SERVICE NAME
          </span>

          <span className="value">
            {referralDetails.serviceName}
          </span>
        </div>

        <div className="details-row">
          <span className="label">
            DATE
          </span>

          <span className="value">
            {formatDate(referralDetails.date)}
          </span>
        </div>

        <div className="details-row">
          <span className="label">
            PROFIT
          </span>

          <span className="value">
            {formatCurrency(referralDetails.profit)}
          </span>
        </div>

      </div>

    </div>
    </>
  )
}

export default ReferralDetails