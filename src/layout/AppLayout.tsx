import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { Toaster } from "react-hot-toast";
import { ProductProvider } from "../context/ProductContect";
import { useEffect } from "react";

// Fix: Prevent backdrop from blocking all interaction in production
const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Remove body overflow hidden on mount/unmount to prevent global blocking
  useEffect(() => {
    // Remove any overflow hidden that might be set globally
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="min-h-screen xl:flex">
      <Toaster toastOptions={{ style: { zIndex: 100000 } }} />
      <div>
        <AppSidebar />
        {/* 
          Backdrop should only be rendered when needed (e.g., mobile sidebar open).
          If always rendered, it may block all interaction.
        */}
        {isMobileOpen && <Backdrop />}
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""} flex flex-col`}
        style={{ minHeight: "100vh", maxHeight: "100vh", overflow: "hidden" }}
      >
        <AppHeader />
        <div
          className="p-4 mx-auto w-full max-w-screen-2xl md:p-6 flex-1 overflow-y-auto"
          style={{ minHeight: 0 }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <ProductProvider>
        <LayoutContent />
      </ProductProvider>
    </SidebarProvider>
  );
};

export default AppLayout;
