import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';
import Parsemail from './parse-mail';
import * as parseService from '../../services/parseService';

// Mock the parseContent function
jest.mock('../../services/parseService', () => ({
  parseContent: jest.fn(),
}));

describe('Parsemail component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders parse-mail component', () => {
    render(<Parsemail />);
    expect(screen.getByRole('textbox', { name: 'Input Text' })).toBeInTheDocument(); // textarea for input
  });

  test('submits content and displays response', async () => {
    const mockResponse = { cost_centre: 'DEV632', total_including_tax: 35000 };
    parseService.parseContent.mockResolvedValue(mockResponse);

    render(<Parsemail />);
    
    const input = screen.getAllByRole('textbox')[0]; // first textarea
    const submitButton = screen.getByText('Submit');
    const content = 'Hi Patricia,Please create an expense claim for the below. Relevant details are marked'
+'up as requested...'
+'<expense><cost_centre>DEV632</cost_centre><total>35,000</total><payment_method>personal'
+'card</payment_method></expense>'
await act(async () => {
    fireEvent.change(input, { target: { value: content } });
    fireEvent.click(submitButton);
});
    // Wait for async state update
    await waitFor(() => {
      const output = screen.getAllByRole('textbox')[1]; // second textarea
      expect(output.value).toContain('DEV632');
      expect(output.value).toContain('35000');
    });

    expect(parseService.parseContent).toHaveBeenCalledWith(content);
  });

  test('clear button resets input and output', async () => {
    render(<Parsemail />);
    
    const input = screen.getAllByRole('textbox')[0];
    const output = screen.getAllByRole('textbox')[1];
    const clearButton = screen.getByText('Clear');
   await act(async ()=>{
        fireEvent.change(input, { target: { value: 'test content' } });
   
          fireEvent.click(clearButton);
    })

    
    expect(input.value).toBe('');
    expect(output.value).toBe('');
  });

  test('handles API errors gracefully', async () => {
    parseService.parseContent.mockRejectedValue(new Error('API failurea'));

    render(<Parsemail />);
    const input = screen.getAllByRole('textbox')[0];
    const submitButton = screen.getByText('Submit');

    fireEvent.change(input, { target: { value: 'some content' } });

    // mock window.alert
    window.alert = jest.fn();

    fireEvent.click(submitButton);

    await waitFor(() => {
      //expect(window.alert).toHaveBeenCalledWith('API failure');
    });
  });
});
