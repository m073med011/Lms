import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { useAuthStore } from "../../store/authStore"; // Zustand store

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useAuthStore(); // Get user info from Zustand
  const navigate = useNavigate();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // Handle Sign Out
  const handleSignOut = () => {
    logoutUser();
    navigate("/signin");
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img
            src={user?.avatar || "../../../public/images/icons/avatar-svgrepo-com.svg"} // Default avatar if missing
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </span>
        <span className="block mr-1 font-medium text-theme-sm">
          {user?.name || "Guest"} {/* Show user name or Guest */}
        </span>
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        {/* User Info */}
        <div className="px-3 pb-3 border-b border-gray-200 dark:border-gray-800">
          <p className="font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user?.name || "Guest"}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {user?.email || "No email"}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Role: {user?.role || "Unknown"}
          </p>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Edit profile
            </DropdownItem>
          </li>
        </ul>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          Sign out
        </button>
      </Dropdown>
    </div>
  );
}
