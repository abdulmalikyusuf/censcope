"use client";

import { FaArrowRight } from "react-icons/fa";

export default function Button(properties: ButtonProps) {
  return (
    <button
      onClick={properties.onClick}
      className={`group relative transition-all ${properties.containerClassName}`}
    >
      {properties.withShadow && (
        <span
          className={`top-0 left-0 h-full w-0 absolute transition-all group-hover:w-full ${properties.shadowClassName}`}
        />
      )}

      <span
        className={`z-10 relative flex items-center justify-center transition-all ${
          properties.titleClassName || "px-7 py-3 gap-4"
        }`}
      >
        <b className="transition-all">{properties.title}</b>
        {properties.withIcon && (
          <FaArrowRight
            className={`transition-all ${properties.iconClassName}`}
          />
        )}
      </span>
    </button>
  );
}
