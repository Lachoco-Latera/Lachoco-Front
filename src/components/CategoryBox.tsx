import { IconType } from "react-icons";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onSelect?: () => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onSelect,
}) => {
  const [, setSearchParams] = useSearchParams();

  const handleClick = useCallback(() => {
    setSearchParams({ category: label });
  }, [label, setSearchParams]);

  return (
    <div
      onClick={onSelect || handleClick}
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
      {Icon && <Icon size={26} />}
      {/* Asegúrate de que Icon esté definido antes de renderizarlo */}
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
