import _ from "lodash";
import React from "react";
import { GridColumn, Search, Grid } from "semantic-ui-react";
import { Product } from "@/types.d";

const initialState = {
  loading: false,
  results: [],
  value: "",
};

interface Props {
  products: Product[];
}

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

function SearchExampleStandard({ products }: Props) {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

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

        const results = _.filter(products, (result) => {
          if (isNumber) {
            // Buscar por precio si el término es un número
            return re.test(result.price);
          } else {
            // Buscar por nombre o descripción si no es un número
            return re.test(result.name) || re.test(result.description);
          }
        });

        dispatch({
          type: "FINISH_SEARCH",
          results: results,
        });
      }, 300);
    },
    [products]
  );

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  console.log(products);
  return (
    <Grid>
      <GridColumn width={6}>
        <Search
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
