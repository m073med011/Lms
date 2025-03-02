import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { useDirection } from "../context/DirectionContext";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { direction } = useDirection();

  return (
    <div dir={direction} className="min-h-screen xl:flex">
      {/* Sidebar Position */}
      <div dir={direction}>
        <AppSidebar />
        <Backdrop />
      </div>

      {/* Main Content - Adjust margin dynamically based on direction */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          direction === "ltr"
            ? isExpanded || isHovered
              ? "lg:ml-[290px]" // Push content left in RTL when sidebar is expanded
              : "lg:ml-[90px]"  // Push content left in RTL when sidebar is collapsed
            : isExpanded || isHovered
            ? "lg:mr-[290px]" // Push content right in LTR when sidebar is expanded
            : "lg:mr-[90px]"  // Push content right in LTR when sidebar is collapsed
        } ${isMobileOpen ? "ml-0 mr-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
