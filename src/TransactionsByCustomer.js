// caculate reward points of transaction amount
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

// calculate sum of reward points
const getMonthlyRewards = (transactions) => {
  let totalPoints = 0;

  transactions.forEach((transaction) => {
    totalPoints += calculatePoints(transaction.amount);
  });

  return totalPoints;
};

// finding transaction by month
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

function TransactionsByCustomer({ groupedData }) {
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
                ([month, transactions]) => (
                  <td key={month}>
                    <strong>Month</strong>:{" "}
                    {`${
                      new Date(transactions[0].date).getMonth() + 1
                    }/${new Date(transactions[0].date).getFullYear()}`}{" "}
                    <br /> <strong>Reward Points</strong>:{" "}
                    {getMonthlyRewards(transactions)}
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

export default TransactionsByCustomer;
