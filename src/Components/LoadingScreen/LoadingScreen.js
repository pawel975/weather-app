import React, {useState ,useEffect} from 'react';
import LoadingIcon from "../../assets/my-assets/animated/few-clouds-d.svg";
import Loader from "react-loader-spinner";
import './LoadingScreen.css'

const LoadingScreen = ({location, setLocation}) => {

    const [isModalErrorActive, setIsModalErrorActive] = useState(false)

    const errorFetchData = () => {
        setIsModalErrorActive(true)
    }

    const handleWarsawWeatherClick = ()=> {
        setLocation({
            lat:52.22977,
            lon:21.01178,
        })
        window.location.reload(true)
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
                <p>Can't get localization information. Choose weather for Warsaw or refresh the page.</p>
                <button onClick={handleWarsawWeatherClick} className="loading-screen__warsaw-weather">Weather for Warsaw</button>
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