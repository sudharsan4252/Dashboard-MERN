import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import "./BarChart.css";

const BarChart = ({ month }) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/barchart`, { params: { month } });
        setBarChartData(response.data);
      } catch (error) {
        console.error('Error fetching bar chart data', error);
      }
    };

    fetchBarChartData();
  }, [month]);

  const data = {
    labels: barChartData.map((item) => item.range),
    datasets: [
      {
        label: 'Number of Items',
        data: barChartData.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };
  return (
    <div className="BarChart">
      <h1>Bar Graph</h1>
      <div className="Bar">
        <Bar data={data} />;
      </div>
    </div>
  );
};

export default BarChart;
