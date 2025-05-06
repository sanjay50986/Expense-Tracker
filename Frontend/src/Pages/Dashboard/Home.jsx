import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import { useUserAuth } from '../../Hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import { IoMdCard } from "react-icons/io";
import InfoCard from '../../Components/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { addThousandsSeparator } from '../../Utils/helper';
import RecentTractions from '../../Components/Dashboard/RecentTractions';
import FinanceOverview from '../../Components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../Components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../Components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../Components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../Components/Dashboard/RecentIncome';



const Home = () => {
  useUserAuth();
  const navigate = useNavigate()

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setloading] = useState(false)
  
  console.log(dashboardData)
  
  const fetchDashboardData = async () => {
    if (loading) return;

    setloading(true)
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data)
      }
    } catch (error) {
      console.error("Something went wrong, please try again", error);

    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    return () => { };
  }, [])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary" />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500" />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Expenses"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500" />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTractions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}

          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}

          />

          <ExpenseTransactions
            transactions={dashboardData?.last60DaysExpense?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />
{/* 
          <Last30DaysExpenses
            date={dashboardData?.last60DaysExpense?.transactions  || []} /> */}

          <RecentIncomeWithChart
          data = {dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
          totalIncome = {dashboardData?.totalIncome || 0}/>

          <RecentIncome
          transactions = {dashboardData?.last60DaysIncome?.transactions || []}
          onSeeMore={() => navigate("/income")}/>

        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home
