import { weatherBackgroundColors } from "../global-helpers/weatherBackgroundColors";

const TestColorComponent = () => {

    console.log(weatherBackgroundColors["clearSkyD"])
    const colors = Object.keys(weatherBackgroundColors).map(color => (
        <div style={{
            background: weatherBackgroundColors[color],
            width: '150px', 
            height: '150px',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.4)',
        }}><span style={{color:"white"}}>{color}</span></div>
    ))

    return (
        <>
        <div style={{
            gap: '1rem',
            width: '100%', 
            height: 'fit-content',
            display: 'flex',
            flexWrap: "wrap",
        }}>
            {colors}
        </div>
        </>
    )
}

export default TestColorComponent;