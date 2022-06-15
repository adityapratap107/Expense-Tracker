import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {ExpenseContext} from '../store/expenses-context';

const AllExpenses = () => {
  const expensesCtx = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No register expenses found!"
    />
  );
};

export default AllExpenses;
