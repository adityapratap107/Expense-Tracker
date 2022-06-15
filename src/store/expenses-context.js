import React, {createContext, useReducer} from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2022-05-20'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2023-03-22'),
  },
  {
    id: 'e3',
    description: 'A pair of banans',
    amount: 5.99,
    date: new Date('2022-10-25'),
  },
  {
    id: 'e4',
    description: 'A pair of books',
    amount: 14.79,
    date: new Date('2022-9-12'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 14.59,
    date: new Date('2022-2-18'),
  },
  {
    id: 'e6',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2023-03-22'),
  },
  {
    id: 'e7',
    description: 'A pair of banans',
    amount: 5.99,
    date: new Date('2022-10-25'),
  },
  {
    id: 'e8',
    description: 'A pair of books',
    amount: 14.79,
    date: new Date('2022-9-12'),
  },
  {
    id: 'e9',
    description: 'Another book',
    amount: 14.59,
    date: new Date('2022-2-18'),
  },
];

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  deleteExpense: id => {},
  updateExpense: (id, {description, amount, date}) => {},
});

function expensedReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id: id}, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        expense => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);
    default:
      return state;
  }
}

const ExpensesContextProvider = ({children}) => {
  const [expensesState, dispatch] = useReducer(expensedReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }

  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: id});
  }

  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpensesContextProvider;
