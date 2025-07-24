import { useSidebar } from "../context/SidebarContext";

const Backdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  // Backdrop hanya muncul jika sidebar mobile terbuka
  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 lg:hidden"
      aria-label="Backdrop"
      onClick={toggleMobileSidebar}
      tabIndex={-1}
      role="presentation"
    />
  );
};

export default Backdrop;
