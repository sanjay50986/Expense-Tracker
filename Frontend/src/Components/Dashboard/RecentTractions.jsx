import React, { memo } from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionsInfoCard from '../Cards/TransactionsInfoCard'

const RecentTractions = ({ transactions, onSeeMore }) => {

    console.log(transactions)
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Recent Transactions</h5>
                <button onClick={onSeeMore} className='card-btn'>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>

            <div className='mt-6'>
                {transactions?.slice(0, 5).map((item) => (
                    <TransactionsInfoCard
                        key={item._id}
                        title={item.type == 'expense' ? item.category : item.source}
                        icons={item.icon}
                        date = {moment(item.date).format("DD MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>

        </div>
    )
}

export default RecentTractions
