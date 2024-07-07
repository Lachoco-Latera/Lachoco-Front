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

  // Función para manejar el cambio en la búsqueda
  const handleSearchChange = React.useCallback(
    //@ts-ignore
    (e: any, data: any) => {
      clearTimeout(timeoutRef.current);
      dispatch({ type: "START_SEARCH", query: data.value });
      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: "CLEAN_QUERY" });
          return;
        }

        const searchTerm = data.value.trim();
        const isNumber = /^\d+(\.\d+)?$/.test(searchTerm);
        const re = new RegExp(_.escapeRegExp(searchTerm), "i");

        let filteredResults = _.filter(products, (result: any) => {
          if (isNumber) {
            return re.test(result.price);
          } else {
            return re.test(result.name) || re.test(result.description);
          }
        });

        // Agrupar resultados por categoría
        const categorizedResults = _.groupBy(filteredResults, "category");

        const finalResults = _.map(categorizedResults, (value, key) => ({
          name: key,
          results: value.slice(0, 6).map((result) => ({
            title: result.name,
            description: result.description
              .split(" ")
              .slice(0, 12)
              .join(" ")
              .concat(result.description.split(" ").length > 12 ? "..." : ""),
            image: result.images.length > 0 ? result.images[0].img : undefined,
            price: result.price,
          })),
        }));

        dispatch({
          type: "FINISH_SEARCH",
          results: finalResults,
        });
      }, 300);
    },
    [products]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://lachocoback.vercel.app/products"
        );
        const productsWithCategory = response.data.map((product: any) => ({
          ...product,
          category: "Tabletas", // Hasta que cambien los products por el trabajo en suscripción
        }));
        setProducts(productsWithCategory);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Grid>
      <GridColumn width={16}>
        <Search
          fluid
          category
          loading={loading}
          placeholder="¿Qué quieres probar?" //@ts-ignore
          onResultSelect={(e, data) => {
            dispatch({
              type: "UPDATE_SELECTION",
              selection: data.result.title,
            });
            window.location.href = `/products/${data.result.id}`;
            /*NO UTILIZAR "useNavigate" 
            ROMPE POR COMPLETO EL CICLO DE VIDA DE LOS COMPONENTES 
            CON EL HOOK */
          }}
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
      </GridColumn>
    </Grid>
  );
}

export default SearchExampleStandard;
