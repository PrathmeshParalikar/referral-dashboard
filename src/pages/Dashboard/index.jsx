import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import './index.css'

import OverviewCards from "../../components/OverviewCards"
import ServiceSummary from "../../components/ServiceSummary"
import ShareReferral from "../../components/ShareReferral"
import ReferralTable from "../../components/ReferralTable"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"


const Dashboard = () => {
    const navigate = useNavigate()

    const [dashboardData, setDashboardData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [sortOrder, setSortOrder] = useState('desc')
    const [debouncedSearchInput, setDebouncedSearchInput] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchInput(searchInput)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchInput])

    useEffect(() => {
        getDashboardData()
    },[debouncedSearchInput, sortOrder])

    const getDashboardData = async () => {
        setIsLoading(true)

        const token = Cookies.get('jwt_token')

        let url = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals"

        const params = new URLSearchParams()
        if (debouncedSearchInput) {
            params.append('search', debouncedSearchInput)
        }
        if (sortOrder) {
            params.append('sort', sortOrder)
        }

        url = `${url}?${params.toString()}`

        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        }

        const response = await fetch(url, options)
        const data = await response.json()

        if (response.ok) {
            setDashboardData(data.data)
        } else {
            setErrorMsg(data.message)
        }
        setIsLoading(false)
    }

    if (errorMsg) {
        return <h1>{errorMsg}</h1>
    }

    if (dashboardData === null) {
        return <p>Loading...</p>
    }

    const onLogout = () => {
        Cookies.remove('jwt_token')
        navigate('/login')
    }

    return (
        <>
        <Navbar onLogout={onLogout} />
        <div className="dashboard-container">

            <div className="dashboard-content">

                <h1 className="dashboard-title">
                    Referral Dashboard
                </h1>

                <p className="dashboard-description">
                    Track your referrals, earnings, and partner activity in one place.
                </p>

                <div className="dashboard-section">
                    <h2 className="section-title">Overview</h2>
                    <OverviewCards metrics={dashboardData.metrics} />
                </div>

                <div className="dashboard-section">
                    <h2 className="section-title">Service Summary</h2>
                    <ServiceSummary serviceSummary={dashboardData.serviceSummary} />    
                </div>

                <div className="dashboard-section">
                    <ShareReferral referral={dashboardData.referral} />
                </div>

                <div className="dashboard-section">
                    <ReferralTable
                        referrals={dashboardData.referrals}
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />
                </div>

            </div>

            <Footer />

        </div>
        </>
    )

}

export default Dashboard