import Wrapper from './index'
import { render, screen } from "#test/testUtils"


describe('Wrapper Component', () => {
    it('should render', () => {
        render(<Wrapper />)
        const header = screen.getByTestId('header')
        expect(header).toBeInTheDocument()
    })
})