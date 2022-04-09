import './ForecastWrapper.scss'

const ForecastWrapper = (props) => {
    return (
        <section className="forecast-wrapper">
            {props.children}
        </section>
    )
}

export default ForecastWrapper;