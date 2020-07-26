import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onIngredientChange } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  useEffect(() => {
    const query =
      enteredFilter.length === 0
        ? ""
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
    console.log(
      "query",
      "https://react-hooks-8e22d.firebaseio.com/ingredients.json" + query
    );
    fetch("https://react-hooks-8e22d.firebaseio.com/ingredients.json" + query)
      .then((response) => response.json())
      .then((responseData) => {
        const ingredients = [];
        for (let key in responseData) {
          ingredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }

        onIngredientChange(ingredients);
      });
  }, [enteredFilter, onIngredientChange]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
