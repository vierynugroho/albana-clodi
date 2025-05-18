import { useCallback, useEffect, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { Dropdown } from "../ui/dropdown/Dropdown";
import ModalUploadExel from "./importExel/ModalUploadExel";
import Button from "../ui/button/Button";
import UploadExelMenuIte from "./optionDropdown/UploadExelMenuItem";
import CategoryProductMenuItem from "./optionDropdown/CategoryProductMenuItem";
import BarcodeMenuItem from "./optionDropdown/BarcodeMenuItem";

export default function OptionDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [exelFormOpen, setExcelFormOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleExcelForm = useCallback(() => {
    setExcelFormOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="relative">
      <Button
        onClick={toggleDropdown}
        size={isMobile ? "sm" : "md"}
        variant="primary"
        startIcon={<AiOutlineBars className="size-5" />}
        className="dropdown-toggle"
      ></Button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <ul className="flex flex-col gap-1 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <UploadExelMenuIte toggleExcelForm={toggleExcelForm} />
          </li>
          <li>
            <CategoryProductMenuItem />
          </li>
          <li>
            <BarcodeMenuItem />
          </li>
        </ul>
      </Dropdown>

      {exelFormOpen ? <ModalUploadExel changeModal={toggleExcelForm} /> : null}
    </div>
  );
}
