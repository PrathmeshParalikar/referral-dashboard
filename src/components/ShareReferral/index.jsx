import './index.css'

const ShareReferral = ({referral}) => {
    const copyLink = () => {
        navigator.clipboard.writeText(referral.link)
        alert('Link copied')
    }

    const copyCode = () => {
        navigator.clipboard.writeText(referral.code)
        alert('Code copied')
    }

    return (
        <div className="referral-wrapper">

            <h2 className="referral-title">
                Refer friends and earn more
            </h2>

            <div className="referral-grid">

                <div className="referral-block">
                    <label className="referral-label">
                        YOUR REFERRAL LINK
                    </label>

                    <div className="referral-copy-row">
                        <input
                            value={referral.link}
                            readOnly
                            className="referral-input"
                        />

                        <button
                            onClick={copyLink}
                            className="copy-btn"
                        >
                            Copy
                        </button>
                    </div>
                </div>

                <div className="referral-block">
                    <label className="referral-label">
                        YOUR REFERRAL CODE
                    </label>

                    <div className="referral-copy-row">
                        <input
                            value={referral.code}
                            readOnly
                            className="referral-input"
                        />

                        <button
                            onClick={copyCode}
                            className="copy-btn"
                        >
                            Copy
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ShareReferral