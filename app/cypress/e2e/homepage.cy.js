context('Assertions', () => {
  // beforeEach(() => {
  //   cy.visit('http://localhost:3000') // change URL to match your dev URL
  // })

  describe('The Home Page', () => {
    it('successfully loads', () => {
      cy.visit('/') // change URL to match your dev URL
    })
  })
})

/*
Tests
- The Home Page
- Mobile viewports
  - Navbar etc
- Contact us
- About us
- Terms & Privacy
 */
