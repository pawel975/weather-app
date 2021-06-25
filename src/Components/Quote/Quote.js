import React, {useState,useEffect} from 'react';
import './Quote.css';
import axios from 'axios';

const Quote = () => {

    const [quoteState, setQuoteState] = useState("");

    let interval = null;


    const fetchQuoteData = () => {

        clearInterval(interval)

        const URL = 'https://type.fit/api/quotes';

        axios.get(URL).then(quote=> {
            const index = Math.floor(Math.random()*quote.data.length);
            setQuoteState({
                ...quoteState,
                quoteText: quote.data[index].text,
                quoteAuthor: quote.data[index].author,
            })    
        })

        interval = setInterval(fetchQuoteData,10000)
    }

    useEffect(() => {
        fetchQuoteData()
    }, [])

    
    return(
        <div style={{display: "initial"}} className="quote">
            <p><em>{quoteState.quoteText}</em></p>
            <h3>{!quoteState.quoteAuthor? "Unknown Author" : quoteState.quoteAuthor}</h3>
        </div>
    )
}

export default Quote;