import React from 'react'

const colors = {
    default: "text-gray-500 font-medium",
    low: "text-yellow-500 font-medium",
    out: "text-red-500 font-medium"
}

function InventoryCard({ title, value, detail, type, icon, iconBg }) {

    return (
        <div className='bg-white flex flex-col rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
            <div className='flex items-center justify-between'>
                <p className='text-sm font-semibold text-gray-500'>{title}</p>
                <div className={`h-10 w-10 flex items-center justify-center rounded-xl ${iconBg || "bg-gray-50 text-gray-400"}`}>
                    {icon}
                </div>
            </div>
            <h1 className='font-bold text-3xl text-gray-900 '>{value}</h1>
            <p className={`text-sm mt-1 ${colors[type]}`}>{detail}</p>
        </div>
    )
}

export default InventoryCard