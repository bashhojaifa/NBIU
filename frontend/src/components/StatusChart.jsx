import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = ({ dashboardSummary }) => {
  const { t } = useTranslation();

  const data = {
    labels: [...dashboardSummary?.map((i) => t(i._id))],
    datasets: [
      {
        label: t('status of count'),
        data: [...dashboardSummary?.map((i) => i.count)],
        backgroundColor: ['#82d616', '#21bf73', '#ea0606', '#17c1e8'],
        borderColor: ['#82d616', '#21bf73', '#ea0606', '#17c1e8'],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};

export default StatusChart;
