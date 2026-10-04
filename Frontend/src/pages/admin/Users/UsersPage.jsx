import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { useUser } from '../../../hooks/useUser';

// const DATA = [
//   { name: "John Doe", email: "john@example.com", orders: 12, joinedDate: "Jun 18, 2025", status: "Active" },
//   { name: "Jane Smith", email: "jane@example.com", orders: 8, joinedDate: "Jun 17, 2025", status: "Active" },
//   { name: "Robert Brown", email: "robert@example.com", orders: 5, joinedDate: "Jun 16, 2025", status: "Active" },
//   { name: "Emily Davis", email: "emily@example.com", orders: 3, joinedDate: "Jun 15, 2025", status: "Inactive" },
//   { name: "Michael Wilson", email: "michael@example.com", orders: 7, joinedDate: "Jun 14, 2025", status: "Active" },
//   { name: "Admin User", email: "admin@shopper.com", orders: 0, joinedDate: "May 20, 2025", status: "Active" },
//   { name: "Sarah Johnson", email: "sarah@example.com", orders: 2, joinedDate: "May 19, 2025", status: "Inactive" },

//   { name: "Piyush", email: "piyush@example.com", orders: 22, joinedDate: "Jun 18, 2025", status: "Active" },
//   { name: "Kumar", email: "pumar@example.com", orders: 1, joinedDate: "Jun 17, 2025", status: "Active" },
//   { name: "Singh", email: "singh@example.com", orders: 6, joinedDate: "Jun 16, 2025", status: "Active" },
//   { name: "Rajput", email: "rajput@example.com", orders: 9, joinedDate: "Jun 15, 2025", status: "Inactive" },
//   { name: "Prince", email: "prince@example.com", orders: 11, joinedDate: "Jun 14, 2025", status: "Active" },
//   { name: "Singh ", email: "singh@shopper.com", orders: 12, joinedDate: "May 20, 2025", status: "Active" },
//   { name: "Pritam", email: "pritam@example.com", orders: 13, joinedDate: "May 19, 2025", status: "Inactive" }
// ];

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

function UsersPage() {

  const {users, loading, pagination, fetchUsers} = useUser();

  const [search, setSearch] = useState("");

  const handleSearch = (e)=>{

     setSearch(e.target.value);

     fetchUsers(1, 10, e.target.value);
  }

  useEffect(()=>{
     fetchUsers(1, 10, search);
  }, [fetchUsers]);

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <div className="mx-auto">
        
        {/* Header & Search Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Users</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your team members and their account permissions here.</p>
          </div>

          <div className="relative w-full sm:w-80 shadow-sm rounded-lg">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <IoSearch className="h-5 w-5" />
            </span>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Search by name or email..."
            />
          </div>
        </div>

        {/* Table Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          <div className="overflow-x-auto max-h-[500px] overflow-y-auto [scrollbar-width:none]">
           
            <table className="w-full whitespace-nowrap text-left text-sm">
             
              <thead className="sticky top-0 z-10 bg-gray-50 text-sm font-semibold uppercase tracking-wider text-gray-500">
               
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4 text-center">Orders</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
             
              </thead>

              <tbody className="divide-y divide-gray-100">
                
                  {loading ? (

                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        Loading users...
                      </td>
                    </tr>

                  ) : users.length > 0 ? (
                   users.map((user, index) => (
                    <tr key={index} className="transition-colors hover:bg-gray-50">
                      {/* Name & Email with Avatar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                            {getInitials(user.username)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.username}</div>
                            <div className="text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600 text-center">
                        {user.orders || 0}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString("en-IN",{
                           day: "numeric",
                           month: "short",
                           year: "numeric"
                        })}
                      </td>

                      <td className="px-6 py-4">
                        {/* <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                            user.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20'
                              : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10'
                          }`}
                        >
                          {user.status}
                        </span> */}
                         <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                              Active
                         </span>

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UsersPage;