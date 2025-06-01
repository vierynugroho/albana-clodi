import { useState, useRef, useEffect } from "react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function DropdownAction({ onEdit, onDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="text-gray-500 hover:text-black text-lg px-2"
      >
        &#x2026;
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
          <button
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-50 border-b border-gray-100 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
          >
            Hapus
          </button>
        </div>
      )}
    </div>
  );
}
