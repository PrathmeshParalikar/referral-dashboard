import './index.css'

const icons = ['💲', '💳', '🔗', '⏳', '%', '💰', '👥', '⇄']

const OverviewCards = ({metrics}) => (
    <div className="overview-grid">
        {metrics.map((metric, index) => (
        <div
            key={metric.id}
            className="overview-card"
        >
            <div className="overview-icon">
                {icons[index] || '📊'}
            </div>

            <h3 className="overview-value">
                {metric.value}
            </h3>

            <p className="overview-label">
                {metric.label}
            </p>
        </div>
        ))}
    </div>
)

export default OverviewCards