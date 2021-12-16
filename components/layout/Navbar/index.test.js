import Navbar from './index'
import { render, screen } from "#test/testUtils";


describe('Navbar Component', () => {
    it('should render', () => {
        render(<Navbar />)
        const header = screen.getByTestId('header')
        expect(header).toBeInTheDocument()
    })
})