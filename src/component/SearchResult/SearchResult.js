import { memo } from 'react';
import AccoutItems from '~/component/AccountItems';

function SearchResult({ searchResults, handleChoose }) {
    return searchResults.map((item) => <AccoutItems key={item.id} data={item} onChoose={handleChoose} />);
}

export default memo(SearchResult);
