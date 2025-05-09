import React, { useEffect, useRef, useState } from "react";

type OptionDataProduk = {
  id: number;
  name: string;
};

type Props = {
  options: OptionDataProduk[];
  label: keyof OptionDataProduk;
  id: string | number;
  selectedVal: string | number;
  handleChange: (value: string) => void;
  setListProduk: React.Dispatch<React.SetStateAction<OptionDataProduk[]>>;
};

export default function SearchableDropdown({
  options,
  label,
  id,
  selectedVal,
  handleChange,
  setListProduk,
}: Props) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option: OptionDataProduk) => {
    setQuery(() => "");
    setListProduk((prev) => [...prev, option]);
    handleChange(String(option[label]));
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e: MouseEvent | React.MouseEvent) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  const filter = (options: OptionDataProduk[]) => {
    return options.filter((option) =>
      String(option[label]).toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="relative cursor-default">
      {/* dropdown */}
      <div className="control">
        <div className="">
          <input
            className="w-full px-[10px] pr-[52px] py-[8px] text-base leading-[1.5] bg-white border border-[#ccc] box-border cursor-default outline-none transition-all duration-200 ease-in-out rounded-lg dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            ref={inputRef}
            type="text"
            placeholder="Masukkan Nama Produk"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange("");
            }}
            onClick={toggle}
          />
        </div>
        <div
          className={`absolute top-[14px] right-[10px] mt-[0.3rem] block w-0 h-0 border-[5px] border-solid border-t-[#999] border-x-transparent border-b-0 content-['']   ${
            isOpen ? "open" : ""
          }`}
        ></div>
      </div>

      <div
        className={`options  bg-white border border-gray-300 shadow-sm box-border mt-[-1px] max-h-[200px] overflow-y-auto absolute top-full w-full z-[1000] overflow-touch ${
          isOpen ? "open" : "hidden"
        }`}
      >
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`option box-border cursor-pointer block p-2 hover:text-[#333333] hover:bg-[#f2f9fc] dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30${
                option[label] === selectedVal
                  ? "selected bg-[#f2f9fc] text-[#333333]"
                  : ""
              }`}
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
