import React from 'react';
import LoadingIcon from "../../assets/my-assets/animated/few-clouds-d.svg";
import Loader from "react-loader-spinner";
import './LoadingScreen.css'

const LoadingScreen = () => {

    return(
        <div className="loading-screen">
            <img className="loading-screen__icon" src={LoadingIcon} alt="" />
            <Loader type="Oval" color="#00BFFF" height={80} width={80} />
            <p>Loading weather...</p>
        </div>
    )
}

export default LoadingScreen;