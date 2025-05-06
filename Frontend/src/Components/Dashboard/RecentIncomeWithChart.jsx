import React, { useState, useEffect } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4F39F6"];

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const prepareChartData = () => {
            const dataArr = data.map((item) => ({
                name: item?.source || 'Unknown',
                amount: item?.amount || 0
            }));
            setChartData(dataArr);
        };

        prepareChartData();
    }, [data]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg ">Last 60 Days Income</h5>
            </div>

            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`₹ ${totalIncome}`}
                showTextAnchor={true}
                color={COLORS}
            />
        </div>
    );
};

export default RecentIncomeWithChart;
