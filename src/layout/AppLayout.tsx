import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { Toaster } from "react-hot-toast";
import { ProductProvider } from "../context/ProductContect";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
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
        {/* Toaster dipindahkan ke root layout agar tidak ter-mount ulang */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: { zIndex: 99999, fontSize: "1rem" },
            duration: 4000,
            success: {
              style: { background: "#22c55e", color: "#fff" },
            },
            error: {
              style: { background: "#ef4444", color: "#fff" },
            },
          }}
        />
        <LayoutContent />
      </ProductProvider>
    </SidebarProvider>
  );
};

export default AppLayout;
