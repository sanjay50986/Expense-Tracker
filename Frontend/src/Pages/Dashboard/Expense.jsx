import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../Hooks/useUserAuth'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import { API_PATHS } from '../../Utils/apiPaths'
import toast from 'react-hot-toast'
import ExpenseOverview from '../../Components/Expense/ExpenseOverview'
import Model from '../../Components/Model/Model'
import ExpenseList from '../../Components/Expense/ExpenseList'
import AddExpenseForm from '../../Components/Expense/AddExpenseForm'
import DeleteAlert from '../../Components/DeleteAlert'
import axiosInstance from '../../Utils/axiosInstance'

const Expense = () => {
  useUserAuth()

  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false)


  const fetchExpenseDetails = async () => {

    if (loading) return null;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
    } finally {
      setLoading(false)
    }

  }

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    console.log("calll")
    if (!category.trim()) {
      toast.error("Category is required!")
    }

    if (!amount || isNaN(amount) || Number(amount <= 0)) {
      toast.error("Amount should be a valid number greater then 0")
      return;
    }

    if (!date) {

      toast.error("Date is required")
      return

    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      });

      setOpenAddExpenseModel(false);
      toast.success("Expense added successfully")
      fetchExpenseDetails()
    } catch (error) {
      console.error(
        "Error adding expense",
        error.response?.date?.message || error.message
      );

    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Expense details deleted successfully")
      fetchExpenseDetails()
    } catch (error) {
      console.error(
        "Error deleting expense",
        error.response?.data?.message || error.message
      )
    }
  };

  useEffect(() => {
    fetchExpenseDetails()
  }, [])



  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModel(true)}
            />

          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({
              show: true,
              data: id
            })}
          />
        </div>

        <Model
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >

          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Model>

        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Model>
      </div>
    </DashboardLayout>

  )
}

export default Expense
