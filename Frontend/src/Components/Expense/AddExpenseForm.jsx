import React, { useState } from 'react'
import EmojiPickerPopup from '../Layouts/EmojiPickerPopup'
import Input from '../Inputs/Input';

const AddExpenseForm = ({onAddExpense}) => {
    const [expense, setexpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: ""
    });
    const handleChange = (key, value) => setexpense({ ...expense, [key]: value })
    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)} />
            <Input
                value={expense.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="category"
                placeholders="Rent, Groceries, etc"
                type='text' />


            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholders=""
                type='number'
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholders=""
                type='date'
            />

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => onAddExpense(expense)}>
                    Add Expense
                </button>
            </div>

        </div>
    )
}

export default AddExpenseForm
