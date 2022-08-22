import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
    const {sendRequest, status} = useHttp(addQuote);    //{func. we have to call to start sending this req, status of that req.}
    const history = useHistory();  // useHistory allows us to change the browser history (like navigating us to new page)
    
    useEffect(() => {       
        if (status === 'completed') {
            history.push('/quotes');
        }
    }, [status, history]);
    
    const addQuoteHandler = quoteData => {
        sendRequest(quoteData);
    }

    return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
};

export default NewQuote;