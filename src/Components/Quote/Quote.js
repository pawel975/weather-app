import React, {useState,useEffect} from 'react';
import './Quote.scss';
import axios from 'axios';
import QuoteText from '../QuoteText/QuoteText';
import QuoteAuthor from '../QuoteAuthor/QuoteAuthor';

const Quote = () => {

    const [quoteState, setQuoteState] = useState("");

    let interval = null;

    const fetchQuoteData = () => {

        clearInterval(interval)

        axios.get('https://type.fit/api/quotes').then(quotes => {

            const index = Math.floor(Math.random()*quotes.data.length);
            setQuoteState({
                ...quoteState,
                quoteText: quotes.data[index].text,
                quoteAuthor: quotes.data[index].author,
            })    
        })
        
        interval = setInterval(fetchQuoteData, 10000)
    }
    
    useEffect(() => {
        fetchQuoteData()
    }, [])

    const {quoteText, quoteAuthor} = quoteState;
    
    return(

        <div className="quote">

            <QuoteText quoteText={quoteText} />
            <QuoteAuthor quoteAuthor={quoteAuthor} />

        </div>

    )
}

export default Quote;