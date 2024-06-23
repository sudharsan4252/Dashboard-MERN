import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import "./PieChart.css";


const PieChart = ({ month }) => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/piechart`, { params: { month } });
        setPieChartData(response.data);
      } catch (error) {
        console.error('Error fetching pie chart data', error);
      }
    };

    fetchPieChartData();
  }, [month]);

  const data = {
    labels: pieChartData.map((item) => item._id),
    datasets: [
      {
        label: 'Number of Items',
        data: pieChartData.map((item) => item.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ]
      }
    ]
  };
  return (
    <div className="PieChart">
      <h1>Pie Chart</h1>
      <Pie data={data} />;
    </div>
  );
};

export default PieChart;
