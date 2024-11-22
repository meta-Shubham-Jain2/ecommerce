import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Navbar from '../Navbar';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

it('Should render Navbar Component with a login button', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Navbar/>
      </Provider>
    </BrowserRouter>
  );

  const loginButton = screen.getByRole('input'); // is recommended

  expect(loginButton).toBeInTheDocument();
});