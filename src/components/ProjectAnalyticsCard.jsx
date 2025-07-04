import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Projects',
      data: [3, 5, 8, 6, 10, 12],
      borderColor: '#226440', // Tailwind's blue-500
      backgroundColor: '#226440',
      tension: 0.4,
      fill: false,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          family: 'Poppins',
        },
      },
    },
    tooltip: {
      bodyFont: {
        family: 'Poppins',
      },
      titleFont: {
        family: 'Poppins',
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 2,
        font: {
          family: 'Poppins',
        },
      },
    },
    x: {
      ticks: {
        font: {
          family: 'Poppins',
        },
      },
    },
  },
};


export const ProjectAnalyticsCard = () => (
  <div className="bg-white rounded-xl p-6 shadow border">
    <h3 className="text-primary font-semibold text-lg mb-5">Project Analytics</h3>
    <div className="h-40">
      <Line data={chartData} options={chartOptions} />
    </div>
  </div>
);
