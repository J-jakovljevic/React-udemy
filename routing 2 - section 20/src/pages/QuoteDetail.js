import { Route, useParams } from "react-router-dom";
import Comments from '../components/comments/Comments';

const QuoteDetail = () => {
    const params = useParams();

    return (
        <section>
            <h1>Quote detail page</h1>
            <p>{params.quoteId}</p>
            <Route path='/quotes/:quoteId/comments'> {/* same as path={'/quotes/${params.quoteId}/comments} */}
                <Comments />
            </Route>  
        </section>
    )
};

export default QuoteDetail;