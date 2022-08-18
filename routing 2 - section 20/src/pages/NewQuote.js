import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {
    const history = useHistory();  // useHistory allows us to change the browser history (like navigating us to new page)
    
    const addQuoteHandler = quoteData => {
        console.log(quoteData);

        history.push('/quotes');
    }

    return <QuoteForm onAddQuote={addQuoteHandler}/>
};

export default NewQuote;