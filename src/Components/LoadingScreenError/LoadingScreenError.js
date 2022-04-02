
import './LoadingScreenError.css';

const LoadingScreenError = () => {

    const handleRefreshClick = () => {
        window.location.reload(true)
    }

    return (
        <>
            <div className="loading-screen__error">
                <p>Can't get localization information. PLease check your internet connection and make sure you allow to fetch localization.</p>
                <button onClick={handleRefreshClick} className="loading-screen__refresh">Refresh</button>
            </div>
        </>
    )
    
}

export default LoadingScreenError;