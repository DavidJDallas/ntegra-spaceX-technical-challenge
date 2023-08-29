import {render, waitFor, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom'
import * as React from 'react';
import Header from './Header'


it('Renders the Header component successfully', () => {
    render(<Header/>);

    const title = screen.getByText('Space X Data Display');

    expect(title).toBeInTheDocument();
    
})