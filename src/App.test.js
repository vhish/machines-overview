/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

test('renders App component', () => {
  render(<App />);
  const headerElement = screen.getByText(/Machine data graph/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders table', () =>{
  render(<App />);
  const gridHeader = screen.getByText(/Customer/i);
  expect(gridHeader).toBeInTheDocument();
})

test('filter form modal opens', () =>{
  let { container } = render(<App />);
  const user = userEvent.setup();
  const filterButton = container.querySelector(".ag-icon")
  user.click(filterButton);
  const filterWrapper = container.querySelector('.ag-filter-wrapper')
  expect(filterWrapper).toBeDefined()
})