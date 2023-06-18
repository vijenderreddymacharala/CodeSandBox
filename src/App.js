import React, { useEffect, useState } from "react";
import { mockResponse } from "./mock";
import TransactionsByCustomer from "./TransactionsByCustomer";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Simulate API delay
      const groupedData = groupTransactionsByCustomer(mockResponse.users);
      setData(groupedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // finding transactions by customer
  function groupTransactionsByCustomer(transactions) {
    const groupedData = {};

    transactions.forEach((transaction) => {
      const customerName = transaction.customerName;

      if (groupedData[customerName]) {
        groupedData[customerName].push(transaction);
      } else {
        groupedData[customerName] = [transaction];
      }
    });

    return groupedData;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return <TransactionsByCustomer groupedData={data} />;
}

export default App;
