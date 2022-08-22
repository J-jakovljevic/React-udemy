import { Fragment, useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();  

  console.log(params);

  // getSingleQuote requests an id to know for which quote to fetch the data
  const { quoteId } = params; 

  const {
    sendRequest,
    status,
    data: loadedQuote,// loadedQuotes is alias
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {     // we wanna send req. when this component loads
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
        <div className='centered'>
            <LoadingSpinner />
        </div>
    )
  }

  if (error) {
    return <p className="centered focused">{error}</p>
  }

  console.log(match);

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>  {/* without exact load comments button will be displayed with comments */ } 
        <div className="centered">
          <Link className="btn--flat" to={`${match.path}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>  {/* match.url gives the path you gave to the <Route> that is rendering the page */}
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
