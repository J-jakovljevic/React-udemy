import { Fragment } from "react";
import { Route, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
    { id: 'q1', author: 'Joksi', text: 'Some text' },
    { id: 'q2', author: 'Joksi 2', text: 'Some text2' },
];

const QuoteDetail = () => {
  const params = useParams();

  const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);    // is id quote from array = id quote from url ("quoteId" is set to route in app.js)
  
  if (!quote) {
    return <p>No quote found!</p>
  }
  
  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author}/>
      <Route path={`/quotes/${params.quoteId}/comments`}>    {/* same as path={'/quotes/${params.quoteId}/comments} */}
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
