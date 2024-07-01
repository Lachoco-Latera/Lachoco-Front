import _ from "lodash";
import React, { useEffect, useState } from "react";
import { GridColumn, Search, Grid } from "semantic-ui-react";
import axios from "axios";

const initialState = {
  loading: false,
  results: [],
  value: "",
};

function exampleReducer(state: any, action: any) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection };
    default:
      throw new Error();
  }
}

function SearchExampleStandard() {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;
  const [products, setProducts] = useState([]);

  const timeoutRef: any = React.useRef();
  const handleSearchChange = React.useCallback(
    (e: any, data: any) => {
      clearTimeout(timeoutRef.current);
      dispatch({ type: "START_SEARCH", query: data.value });
      console.log(e ? "Searching on searchbar" : "Event didnt pop");
      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: "CLEAN_QUERY" });
          return;
        }

        const searchTerm = data.value.trim();
        const isNumber = /^\d+(\.\d+)?$/.test(searchTerm);
        const re = new RegExp(_.escapeRegExp(searchTerm), "i");

        let results = _.filter(products, (result: any) => {
          if (isNumber) {
            // Buscar por precio si el término es un número
            return re.test(result.price);
          } else {
            // Buscar por nombre o descripción si no es un número
            return re.test(result.name) || re.test(result.description);
          }
        });
        results = results.slice(0, 6).map((result) => ({
          ...result,
          description: result.description
            .split(" ")
            .slice(0, 12)
            .join(" ")
            .concat(result.description.split(" ").length > 12 ? "..." : ""),
          image: result.images.length > 0 ? result.images[0].img : undefined,
        }));

        dispatch({
          type: "FINISH_SEARCH",
          results: results,
        });
      }, 300);
    },
    [products]
  );
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://lachoco.onrender.com/products"
        );
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  console.log(products);
  return (
    <Grid>
      <GridColumn width={16}>
        <Search
          fluid
          loading={loading}
          placeholder="Chocolatéa!"
          onResultSelect={(e, data) => (
            dispatch({
              type: "UPDATE_SELECTION",
              selection: data.result.title,
            }),
            console.log(e ? "Got searched on searchbar" : "Event didnt pop")
          )}
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
      </GridColumn>
    </Grid>
  );
}

export default SearchExampleStandard;
