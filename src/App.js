import React, { useEffect, useState } from "react";
import { mockResponse } from "./mock";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const calculatePoints = (transactionAmount) => {
    let points = 0;
    const amount = parseFloat(transactionAmount);

    if (amount > 100) {
      points += (amount - 100) * 2 + 50;
    }

    if (amount >= 50 && amount <= 100) {
      points += amount - 50;
    }

    return points;
  };

  const getMonthlyRewards = (transactions) => {
    let totalPoints = 0;

    transactions.forEach((transaction) => {
      totalPoints += calculatePoints(transaction.amount);
    });

    return totalPoints;
  };

  const fetchData = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const groupedData = groupTransactionsByCustomer(mockResponse.users);
      setData(groupedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  function groupTransactionsByMonth(transactions) {
    const groupedData = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.getMonth();

      if (groupedData[month]) {
        groupedData[month].push(transaction);
      } else {
        groupedData[month] = [transaction];
      }
    });
    return groupedData;
  }

  function GroupedDataComponent({ groupedData }) {
    return (
      <div>
        <table cellPadding="10">
          <thead>
            <tr>
              <td>Customer</td>
              <td colSpan="3">Monthly Reward Points</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedData).map(([customer, transactions]) => (
              <tr key={customer}>
                <td>{customer}</td>
                {Object.entries(groupTransactionsByMonth(transactions)).map(
                  ([key, value]) => (
                    <td key={key}>
                      <strong>Month</strong>:{" "}
                      {`${new Date(value[0].date).getMonth() + 1}/${new Date(
                        value[0].date
                      ).getFullYear()}`}{" "}
                      <br /> <strong>Reward Points</strong>:{" "}
                      {getMonthlyRewards(value)}
                    </td>
                  )
                )}
                <td>
                  {transactions.reduce(
                    (total, transaction) =>
                      total + calculatePoints(transaction.amount),
                    0
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return <GroupedDataComponent groupedData={data} />;
}

export default App;
