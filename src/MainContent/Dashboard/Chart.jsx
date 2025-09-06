import React, { useContext, useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { ChartContext } from '../../ContextAPI/Chart/createContext';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Chart() {
  const [barChartData, setBarChartData] = useState({ labels: [], datasets: [] });
  const [pieChartData, setPieChartData] = useState({ labels: [], datasets: [] });
  const { isActive } = useContext(ChartContext);

  useEffect(() => {
    const fetchTotalNumberJobsData = async () => {
      try {
        const res = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch-all-jobs');
        const data = await res.json();
        console.log(data, 'data');

        if (!Array.isArray(data.jobs)) throw new Error('Invalid jobs data');

        const jobTitles = data.jobs.map(job => job.jobDetails?.jobTitle || 'Unknown');
        const uniqueTitles = [...new Set(jobTitles)];
        const jobCounts = uniqueTitles.map(
          title => jobTitles.filter(t => t === title).length
        );

        const colors = [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#7BDCB5', '#F67019'
        ];

        setBarChartData({
          labels: uniqueTitles,
          datasets: [
            {
              label: 'Number of Jobs',
              data: jobCounts,
              backgroundColor: colors.slice(0, uniqueTitles.length),
              borderWidth: 1,
              barThickness: 40
            }
          ]
        });

        setPieChartData({
          labels: uniqueTitles,
          datasets: [
            {
              label: 'Jobs Distribution',
              data: jobCounts,
              backgroundColor: colors.slice(0, uniqueTitles.length)
            }
          ]
        });
      } catch (err) {
        console.error(err);
        console.log('Failed to load chart data');
      }
    };

    if (isActive === 'availableApplications') {
      fetchTotalNumberJobsData();
    }
  }, [isActive]);

  return (
    <div className="p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 justify-center items-stretch">
      {isActive === 'availableApplications' && (
        <>
        
          <div className="w-full lg:w-2/3 h-[300px] sm:h-[350px] md:h-[400px] bg-white shadow-md rounded-xl p-4">
            <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">Jobs by Title</h2>
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>

      
          <div className="w-full lg:w-1/3 h-[300px] sm:h-[350px] md:h-[400px] bg-white shadow-md rounded-xl p-4">
            <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">Jobs Distribution</h2>
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      boxWidth: 15
                    }
                  }
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Chart;
