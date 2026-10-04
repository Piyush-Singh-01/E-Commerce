import React from 'react'

function StatCard({title, value}) {
  return (
    <div className='flex flex-col justify-center items-center bg-white gap-2 p-4 rounded-lg shadow'>
       <p className='text-gray-500'>{title}</p>
       <p className='text-2xl font-semibold'>{value}</p>
    </div>
  )
}

export default StatCard