import React, {useState ,useEffect} from 'react';
import Loader from "react-loader-spinner";
import './LoadingScreen.scss'
import LoadingScreenError from '../LoadingScreenError/LoadingScreenError';
import LoadingScreenIcon from '../LoadingScreenIcon/LoadingScreenIcon';

const LoadingScreen = () => {

    const [isModalErrorActive, setIsModalErrorActive] = useState(false)

    const errorFetchData = () => {
        setIsModalErrorActive(true)
    }

    // Throw error modal to user that informs about connectivity/localization issue
    useEffect(() => {
        let timeout = setTimeout(errorFetchData, 3000);

        return function(){
            clearTimeout(timeout)
        }
    }, [])

    return(
        <div className="loading-screen">

            {isModalErrorActive && <LoadingScreenError/>}
            <LoadingScreenIcon />
            <Loader type="Oval" color="#00BFFF" height={80} width={80} />
            <p className="loading-screen__loading-info">Loading weather...</p>

        </div>
    )
}

export default LoadingScreen;