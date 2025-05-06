import moment from 'moment'
import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionsInfoCard from '../Cards/TransactionsInfoCard'

const ExpenseList = ({ transactions, onDelete }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5>Expense Source</h5>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-1'>
        {transactions?.map((expense) => (
          <TransactionsInfoCard
            key={expense._id}
            title={expense.category}
            icom={expense.icon}
            date={moment(expense.date).format("DO MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)} />
        ))}
      </div>

    </div>
  )
}

export default ExpenseList
