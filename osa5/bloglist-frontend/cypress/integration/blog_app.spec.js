describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'dicky',
      name: 'Pekka Laine',
      password: 'eira123'
    })

    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'kake',
      name: 'Kake',
      password: 'abc123'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('login succeeds with correct credentials', function() {
      cy.get('#username').type('dicky')
      cy.get('#password').type('eira123')
      cy.get('#login').click()

      cy.contains('Pekka Laine logged in')
  })

    it('login fails with wrong credentials', function() {
      cy.get('#username').type('dicky')
      cy.get('#password').type('wrong')
      cy.get('#login').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Pekka Laine logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'dicky', password: 'eira123' })
      
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#author').type('David Walsh')
      cy.get('#title').type('JavaScript in SVGs')
      cy.get('#url').type('https://davidwalsh.name/javascript-in-svgs')
      cy.get('#create').click()

      cy.contains('JavaScript in SVGs')
      cy.contains('David Walsh')
    })
  })

  describe('and many blogs exist', function () {
    beforeEach(function () {
      cy.login({ username: 'dicky', password: 'eira123' })
      
      
      cy.createBlog({ title: 'blog2', author: 'tester2', url: 'www.yahoo.com' })
      cy.createBlog({ title: 'blog3', author: 'tester3', url: 'http://www.automatingosint.com/blog/' })

      cy.login({ username: 'kake', password: 'abc123' })

      cy.createBlog({ title: 'blog1', author: 'tester1', url: 'www.google.com' })

      cy.contains('blog1').parent().parent().as('blog1')
      cy.contains('blog2').parent().parent().as('blog2')
      cy.contains('blog3').parent().parent().as('blog3')
    })

    it('Blogs can be liked', function() {
      cy.get('@blog3').contains('view').click()
      cy.get('@blog3').contains('like').click()
      cy.get('@blog3').contains('likes 1')
    })

    it('A blog can be deleted by creator', function() {
      cy.get('@blog1').contains('view').click()
      cy.get('@blog1').contains('remove').click()
      cy.get('home').should('not.contain', 'blog1')

      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').should('not.contain', 'remove')
    })

    it('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.get('@like2').click()
      cy.get('@like2').click()
      cy.get('@like2').click()
      cy.get('@like1').click()
      cy.get('@like1').click()
      cy.get('@like3').click()

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('likes 4')
        cy.wrap(blogs[1]).contains('likes 2')
        cy.wrap(blogs[2]).contains('likes 1')
      })
    })
  })
})
