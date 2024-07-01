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

        let filteredResults: any = _.filter(products, (result: any) => {
          if (isNumber) {
            return re.test(result.price);
          } else {
            return re.test(result.name) || re.test(result.description);
          }
        });

        // Limitar los resultados y ajustar la descripción e imagen si es necesario
        filteredResults = filteredResults.slice(0, 6).map((result: any) => ({
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
          results: filteredResults,
        });
      }, 300);
    },
    [products]
  );

  // Obtener productos al cargar el componente
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

  // Limpiar timeout al desmontar el componente
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // Limpiar estado al desmontar el componente
  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAN_QUERY" });
    };
  }, []);

  return (
    <Grid>
      <GridColumn width={16}>
        <Search
          fluid
          loading={loading}
          placeholder="¿Qué quieres probar?"
          onResultSelect={(e, data) => {
            dispatch({
              type: "UPDATE_SELECTION",
              selection: data.result.title,
            });
            window.location.href = `/products/${data.result.id}`;
            /*NO UTILIZAR "useNavigate" 
            ROMPE POR COMPLETO EL CICLO DE VIDA DE LOS COMPONENTES 
            CON EL HOOK */
            console.log(e);
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
