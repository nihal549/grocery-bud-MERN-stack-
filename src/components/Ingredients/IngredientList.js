import React from 'react';

import Style from './IngredientList.css';

const IngredientList = props => {
  return (
    <section className="ingredient-list">
      <h2>Added Items</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id,ig.title)}>
            <span>{ig.title}</span>
            <span>{ig.amount} <span className={Style.remove}>x</span></span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
