import React from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType | undefined; // Permitimos que icon sea undefined para manejar casos donde no hay icono definido
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
  return (
    <div
      onClick={onSelect}
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
      {Icon && <Icon size={26} className="max-h-8" />}
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
