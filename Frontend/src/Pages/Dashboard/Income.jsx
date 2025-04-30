import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import IncomeOverview from '../../Components/Income/IncomeOverview'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPaths'
import Model from '../../Components/Model/Model'

const Income = () => {

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false)
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {

    if (loading) return null;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
    } finally {
      setLoading(false)
    }

  }

  const handleAddIncome = async (income) => {

  }

  const deleteIncome = async (id) => { }

  const handleDownloadIncomeDetails = async () => { };

  useEffect(() => {
    fetchIncomeDetails()
  }, [])

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>
        </div>
        <Model
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income">
            <AddIncomeForm onAddIncome = {handleAddIncome}/>
        </Model>
      </div>
    </DashboardLayout>
  )
}

export default Income
