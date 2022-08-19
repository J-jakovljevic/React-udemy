import { Fragment } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
  { id: "q1", author: "Joksi", text: "Some text" },
  { id: "q2", author: "Joksi 2", text: "Some text2" },
];

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();  

  console.log(match);

  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId); // is id quote from array = id quote from url ("quoteId" is set to route in app.js)

  if (!quote) {
    return <p>No quote found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
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
