import React from 'react';
import { Line } from 'react-chartjs-2';

interface ChartProps {
  data: { date: string; amount: number }[];
}

const ChartComponent: React.FC<ChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) =>
      new Date(item.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Daily Expenses',
        data: data.map((item) => item.amount),
        fill: false,
        backgroundColor: 'rgb(75,192,192)',
        borderColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ChartComponent;
