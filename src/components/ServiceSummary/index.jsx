import './index.css'

const ServiceSummary = ({serviceSummary}) => (
    <div className="service-grid">

        <div className="service-card">
        <p className="service-heading">
            SERVICE
        </p>

        <h3 className="service-value service-name">
            {serviceSummary.service}
        </h3>
        </div>

        <div className="service-card">
        <p className="service-heading">
            YOUR REFERRALS
        </p>

        <h3 className="service-value">
            {serviceSummary.yourReferrals}
        </h3>
        </div>

        <div className="service-card">
        <p className="service-heading">
            ACTIVE REFERRALS
        </p>

        <h3 className="service-value">
            {serviceSummary.activeReferrals}
        </h3>
        </div>

        <div className="service-card">
        <p className="service-heading">
            TOTAL REF. EARNINGS
        </p>

        <h3 className="service-value">
            {serviceSummary.totalRefEarnings}
        </h3>
        </div>

    </div>
)

export default ServiceSummary