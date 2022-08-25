import React from 'react';

import { useStore } from '../../hooks-store/store';
import Card from '../UI/Card';
import './ProductItem.css';

const ProductItem = React.memo(props => {  // .memo bcs if we click fav button on one item, all items rerender, instead of that one we clicked to add to fav
                                // memo makes sure that these items don't rerender if their props didn't change => still isn't enough, we need to add parameter
                                // to store.js in our custom hook
  console.log('RERENDERING');

  const dispatch = useStore(false)[1];    // false bcs we're not interesed in store changing

  const toggleFavHandler = () => {
   // toggleFav(props.id);
   dispatch('TOGGLE_FAV', props.id);
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
