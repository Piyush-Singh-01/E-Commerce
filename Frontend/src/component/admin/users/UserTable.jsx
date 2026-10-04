// import React, { useState } from 'react'
// import { IoSearch } from "react-icons/io5";

// function UserTable() {
//     const Data = [
//   {
//     "name": "John Doe",
//     "email": "john@example.com",
//     "orders": 12,
//     "joinedDate": "Jun 18, 2025",
//     "status": "Active"
//   },
//   {
//     "name": "Jane Smith",
//     "email": "jane@example.com",
//     "orders": 8,
//     "joinedDate": "Jun 17, 2025",
//     "status": "Active"
//   },
//   {
//     "name": "Robert Brown",
//     "email": "robert@example.com",
//     "orders": 5,
//     "joinedDate": "Jun 16, 2025",
//     "status": "Active"
//   },
//   {
//     "name": "Emily Davis",
//     "email": "emily@example.com",
//     "orders": 3,
//     "joinedDate": "Jun 15, 2025",
//     "status": "Inactive"
//   },
//   {
//     "name": "Michael Wilson",
//     "email": "michael@example.com",
//     "orders": 7,
//     "joinedDate": "Jun 14, 2025",
//     "status": "Active"
//   },
//   {
//     "name": "Admin User",
//     "email": "admin@shopper.com",
//     "orders": 0,
//     "joinedDate": "May 20, 2025",
//     "status": "Active"
//   },
//   {
//     "name": "Sarah Johnson",
//     "email": "sarah@example.com",
//     "orders": 2,
//     "joinedDate": "May 19, 2025",
//     "status": "Inactive"
//   }
// ]

//   const [search, setSearch] = useState("");

//   const filteredUser = Data.filter((user)=>(
//       user.name.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase())
//   ))

//   return (
//     <div className='flex flex-col gap-4 bg-gray-100'>
//       <div className='p-4'>
//         <h1 className='font-bold text-2xl'>Users</h1>
//         <p>Manage all registered users</p>
//       </div>
        
//        <div className='relative w-[400px]'>
//          <input value={search} onChange={(e) => setSearch(e.target.value)} className='bg-white w-full text-[16px] p-2 rounded-2xl outline-none' type="text" placeholder='Search name/email' />
//           <span className='absolute top-2 right-4 text-2xl'><IoSearch /></span>
//        </div>
//       <table className='w-full table-auto p-4 bg-white rounded shadow'>

//          <thead>
//              <tr className='border-b text-gray-500'>
//                 <th className='text-left p-4'>USER</th>
//                 <th className='text-left p-4'>Email</th>
//                 <th className='text-left p-4'>Orders</th>
//                 <th className='text-left p-4'>Joined</th>
//                 <th className='text-left p-4'>Status</th>
//              </tr>
//          </thead>
  
//          <tbody>
//             {filteredUser.map((user, index)=>(
//              <tr key={index} className='border-b hover:bg-gray-100'>
//                 <td className='p-4'>{user.name}</td>
//                 <td className='p-4'>{user.email}</td>
//                 <td className='p-4'>{user.orders}</td>
//                 <td className='p-4'>{user.joinedDate}</td>
//                 <td className={`p-4 font-medium ${user.status === 'Active'? "text-green-400": "text-red-400"} `}>
//                     {user.status}
//                 </td>
//              </tr>
//             ))}
            
//          </tbody>
//       </table>
//     </div>
//   )
// }

// export default UserTable