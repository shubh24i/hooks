import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";

import IngredientList from "./IngredientList";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch("https://react-hooks-8e22d.firebaseio.com/ingredients.json")
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const ingredients = [];
        for (let key in responseData) {
          ingredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }

        setUserIngredients(ingredients);
      });
  }, []);

  const addIngrdientHandler = (ingredient) => {
    fetch("https://react-hooks-8e22d.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUserIngredients((prevIngredient) => [
          ...prevIngredient,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };
  const addIngredients = useCallback((ingredients) => {
    console.log(ingredients);
    setUserIngredients(ingredients);
  }, []);
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngrdientHandler} />

      <section>
        <Search onIngredientChange={addIngredients} />
        {
          <IngredientList
            ingredients={userIngredients}
            onRemoveItem={() => {}}
          />
        }
      </section>
    </div>
  );
}

export default Ingredients;
