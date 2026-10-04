import StatCard from '../../../component/admin/dashboard/StatCard'
import SalesChart from '../../../component/admin/dashboard/SalesChart'
import OrdersChart from '../../../component/admin/dashboard/OrdersChart'
import RecentOrdersTable from '../../../component/admin/dashboard/RecentOrdersTable'
import { useEffect } from 'react'
import { useDashboard } from '../../../hooks/useDashboard'

function DashboardPage() {

  const {dashboard, loading, fetchDashboard} = useDashboard();
  
  useEffect(()=>{
      fetchDashboard();   
  },[fetchDashboard])

  console.log(dashboard?.ordersOverview);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
 }
  return (
    <main className='flex flex-col bg-[#F1F5F9]'>
        <div className='mb-4 p-4'>
            <h1 className='text-2xl font-bold'>Dashboard</h1>
            <p>Welcome back, Admin! Here's what's happning with your store</p>
        </div>
       <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8'>
            <StatCard title="Total Sales" value={`₹ ${dashboard?.summary?.totalSales?.toLocaleString("en-In")}`}/>
            <StatCard title="Total Orders"value={dashboard?.summary?.totalOrders}/>
            <StatCard title="Total Users" value={dashboard?.summary?.totalUsers -1}/>
            <StatCard title="Total Products" value={dashboard?.summary?.totalProducts}/>
       </div>

       <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8'>
            <SalesChart salesData={dashboard?.salesOverview}/>
            <OrdersChart ordersData={dashboard?.ordersOverview}/>
       </div>

       <div className='mb-4'>
           <RecentOrdersTable recentOrders = {dashboard?.recentOrders}/>
       </div>
    </main>
  )
}

export default DashboardPage