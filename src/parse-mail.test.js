import { render, screen } from '@testing-library/react';
import Parsemail from './parse-mail';
test('renders parse-mail component', () => {
  render(<Parsemail />);
  const linkElement = screen.getByText(/parse mail/i);
  expect(linkElement).toBeInTheDocument();
});
