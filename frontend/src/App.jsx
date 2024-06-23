import { useState } from 'react'
import './App.css'
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import TransactionsTable from './components/Transactions';
import Statistics from './components/Statistics';

const App = () => {
  // Initial value set to 'March'
  const [selectedMonth, setSelectedMonth] = useState("03");

  const monthNames = [
    { value: "01", name: "January" },
    { value: "02", name: "February" },
    { value: "03", name: "March" },
    { value: "04", name: "April" },
    { value: "05", name: "May" },
    { value: "06", name: "June" },
    { value: "07", name: "July" },
    { value: "08", name: "August" },
    { value: "09", name: "September" },
    { value: "10", name: "October" },
    { value: "11", name: "November" },
    { value: "12", name: "December" },
  ];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <label htmlFor="month-select">Select Month: </label>
      <select
        id="month-select"
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        {monthNames.map(({ value, name }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
      <TransactionsTable month={selectedMonth} />
      <Statistics month={selectedMonth} />
      <div className="chart-section">
        <BarChart month={selectedMonth} />
        <PieChart month={selectedMonth} />
      </div>
    </div>
  );
};

export default App;