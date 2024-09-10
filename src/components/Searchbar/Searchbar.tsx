import _ from "lodash";
import React, { useEffect, useState } from "react";
import { GridColumn, Search, Grid, SearchProps } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VITE_BASE_URL } from "@/config/envs";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation()
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const navigate = useNavigate();

  const redirectToProductDetail = (productId: string) => {
    navigate(`/products/${productId}`);
  };
  const handleSearchChange = React.useCallback(
    (e: React.SyntheticEvent, data: SearchProps) => {
      clearTimeout(timeoutRef.current);
      dispatch({ type: "START_SEARCH", query: data.value || "" });
      timeoutRef.current = setTimeout(() => {
        if (data.value && data.value.length === 0) {
          dispatch({ type: "CLEAN_QUERY" });
          return;
        }

        const searchTerm = data.value?.trim() || "";
        const isNumber = /^\d+(\.\d+)?$/.test(searchTerm);
        const re = new RegExp(_.escapeRegExp(searchTerm), "i");

        let filteredResults = _.filter(products, (result: any) => {
          if (isNumber) {
            return re.test(result.price.toString());
          } else {
            return re.test(result.name) || re.test(result.description);
          }
        });

        const categorizedResults = _.groupBy(
          filteredResults,
          (result: any) => result.category.name
        );

        const finalResults = _.map(categorizedResults, (value, key) => ({
          name: key,
          results: value.slice(0, 6).map((result) => ({
            key: result.id, // Añadir una clave única
            title: result.name,
            description: result.description
              .split(" ")
              .slice(0, 8)
              .join(" ")
              .concat(result.description.split(" ").length > 8 ? "..." : ""),
            image: result.images.length > 0 ? result.images[0] : undefined,
            price: result.price,
            id: result.id,
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
          `${VITE_BASE_URL}/products`
        );
        const productsWithCategory = response.data.map((product: any) => ({
          ...product,
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
      <GridColumn width={16}  mobile={16}>
        <Search
          className="md:"
          fluid
          category
          loading={loading}
          placeholder={t("Search")}
          onResultSelect={(e, data) => {
            dispatch({
              type: "UPDATE_SELECTION",
              selection: data.result.title,
            });
            redirectToProductDetail(data.result.id);
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
