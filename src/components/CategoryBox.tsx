
// import qs from "query-string";

// import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  // const handleClick = useCallback(() => {
  //   let currentQuery = {};

  //   if (params) {
  //     currentQuery = qs.parse(params.toString());
  //   }

  //   const updatedQuery: any = {
  //     ...currentQuery,
  //     category: label,
  //   };

  //   if (params?.get("category") === label) {
  //     delete updatedQuery.category;
  //   }

  //   // Verificar si la ruta actual ya contiene "/es" o "/en"
  //   const currentPath = window.location.pathname;
  //   const hasLocale =
  //     currentPath.startsWith("/es") || currentPath.startsWith("/en");

  //   // Construir la URL con o sin la versión internacionalizada
  //   const url = qs.stringifyUrl(
  //     {
  //       url: hasLocale ? currentPath : "/",
  //       query: updatedQuery,
  //     },
  //     { skipNull: true }
  //   );

  //   router.push(url);
  // }, [label, router, params]);

  return (
    <div
      onClick={() => {
        console.log("handleClick");
      }}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;