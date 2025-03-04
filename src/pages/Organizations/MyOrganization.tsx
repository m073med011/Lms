import React, { useState } from "react";

interface Organization {
  id: number;
  name: string;
  userId: string;
  type: string;
  image: string;
}

const organizations: Organization[] = [
  {
    id: 1,
    name: "Modern Devs",
    userId: "user123",
    type: "Community",
    image: "/images/modern-devs.png",
  },
  {
    id: 2,
    name: "React Masters",
    userId: "user456",
    type: "Tech Group",
    image: "/images/react-masters.png",
  },
  {
    id: 3,
    name: "Next.js Experts",
    userId: "user789",
    type: "Framework Hub",
    image: "/images/nextjs-experts.png",
  },
];

const OrganizationsList: React.FC = () => {
  const [search, setSearch] = useState("");

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-1 min-h-screen"> 
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Organizations</h1>
        <input
          type="text"
          placeholder="Search organizations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <div className="space-y-4">
          {filteredOrganizations.length > 0 ? (
            filteredOrganizations.map((org) => (
              <div key={org.id} className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex items-center space-x-4">
                <img src={org.image} alt={org.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h2 className="text-lg font-semibold">{org.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">User ID: {org.userId}</p>
                  <p className="text-gray-600 dark:text-gray-400">Type: {org.type}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No organizations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationsList;
