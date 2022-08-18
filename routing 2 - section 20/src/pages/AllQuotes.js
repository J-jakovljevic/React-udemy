import QuoteList from '../components/quotes/QuoteList';

const DUMMY_QUOTES = [
    { id: 'q1', author: 'Joksi', text: 'Some text' },
    { id: 'q2', author: 'Joksi 2', text: 'Some text2' },
];

const AllQuotes = () => {
    return <QuoteList quotes={DUMMY_QUOTES} />     // QuoteList.js line 10 wants props.quotes
};

export default AllQuotes;