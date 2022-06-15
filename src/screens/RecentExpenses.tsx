import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {ExpenseContext} from '../store/expenses-context';
import {getDateMinusDays} from '../utils/date';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpenseContext);

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last Expenses"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};

export default RecentExpenses;
