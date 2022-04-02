import React, {useState ,useEffect} from 'react';
import LoadingIcon from "../../assets/animated/few-clouds-d.svg";
import Loader from "react-loader-spinner";
import './LoadingScreen.css'

const LoadingScreen = () => {

    const [isModalErrorActive, setIsModalErrorActive] = useState(false)

    const errorFetchData = () => {
        setIsModalErrorActive(true)
    }

    const handleRefreshClick = () => {
        window.location.reload(true)
    }

    useEffect(() => {
        setTimeout(errorFetchData,5000)
    }, [])

    return(
        <div className="loading-screen">
            {isModalErrorActive && 
            <div className="loading-screen__error">
                <p>Can't get localization information. PLease check your internet connection and make sure you allow to fetch localization.</p>
                <button onClick={handleRefreshClick} className="loading-screen__refresh">Refresh</button>
            </div>
            }
            <img className="loading-screen__icon" src={LoadingIcon} alt="" />
            <Loader type="Oval" color="#00BFFF" height={80} width={80} />
            <p className="loading-screen__loading-info">Loading weather...</p>
        </div>
    )
}

export default LoadingScreen;