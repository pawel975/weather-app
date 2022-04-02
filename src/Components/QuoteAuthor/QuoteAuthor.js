
const QuoteAuthor = ({quoteAuthor}) => {

    return (
        <h3>{!quoteAuthor? "Unknown Author" : quoteAuthor}</h3>
    )
}

export default QuoteAuthor;