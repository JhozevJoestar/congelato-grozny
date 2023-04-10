const Index = require('../pages/index.page')

describe('to catalog check', () => {
    it('to catalog', async () => {
        await Index.open()
        await expect(screen.getByTestId("catalog_page")).toBeInTheDocument();
    })
})


