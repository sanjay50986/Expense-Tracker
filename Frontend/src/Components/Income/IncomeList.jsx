import React from 'react'
import TransactionInfoCard from '../Cards/TransactionsInfoCard'
import moment from 'moment'
import { LuDownload } from 'react-icons/lu'

const IncomeList = ({ transactions, onDelete, onDownload }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5>Income Source</h5>


            </div>

            <div className='grid grid-cols-1 md:grid-cols-1'>
                {transactions?.map((income) => (
                    <TransactionInfoCard
                        key={income._id}
                        title={income.source}
                        icom={income.icon}
                        date={moment(income.date).format("DO MMM YYYY")}
                        amount={income.amount}
                        type="income"
                        onDelete = {() => onDelete(income._id)} />
                ))}
            </div>

        </div>
    )
}

export default IncomeList
