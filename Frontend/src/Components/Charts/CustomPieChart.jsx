import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({
    showTextAnchor,
    color,
    totalAmount,
    label,
    data
}) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                    label={label} // Optional: Pass a label function or boolean
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={color[index % color.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
                {showTextAnchor && (
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        fill="#333"
                        fontSize="24px"
                        fontWeight="600"
                        dominantBaseline="middle"
                    >
                        {totalAmount}
                    </text>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
