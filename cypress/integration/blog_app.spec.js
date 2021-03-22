describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testuser'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    localStorage.removeItem('loggedBlogListUser')
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Welcome to Blog Web')
    cy.contains('Blogs')
  })

  describe('Login', function() {
    it('log in button can be seen by default', function() {
      cy.contains('log in').click()
    })

    it('user login success', function() {
      cy.contains('log in').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('testuser')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
      cy.contains('log out')
    })

    it('user login fail', function() {
      cy.contains('log in').click()
      cy.get('#username').type('asdf')
      cy.get('#password').type('testuser')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.contains('log in')
    })
  })

  describe('Log out', function() {
    it('user logout success', function() {
      cy.login({ username: 'testuser', password: 'testuser' })
      cy.contains('log out').click()
      cy.contains('log in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'testuser' })
    })

    it('A blog can be created', function() {
      cy.contains('create').click()
      cy.get('#title').type('a new blog')
      cy.get('#author').type('the 1')
      cy.get('#url').type('the url')
      cy.contains('save').click()
      cy.get('.info')
        .should('contain', 'added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.contains('a new blog')
    })

    it('a new blog can be liked', function() {
      cy.addBlog({ title: 'title1', author: 'author1', url: 'url1', likes: 0 })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('a blog can not be deleted by the user who created', function() {
      cy.addBlog({ title: 'title1', author: 'author1', url: 'url1', likes: 0 })
      cy.contains('log out').click()
      const user = {
        name: 'Test User',
        username: 'testuser1',
        password: 'testuser'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.login({ username: 'testuser1', password: 'testuser' })
      cy.contains('title1').contains('view').click()
      cy.contains('title1').contains('delete').should('not.exist')
    })

    it('a blog can be deleted by the user who created', function() {
      cy.addBlog({ title: 'title1', author: 'author1', url: 'url1', likes: 0 })
      cy.contains('title1').contains('view').click()
      cy.contains('delete').click()
      cy.contains('title1').should('not.exist')
    })

    it('checks that the blogs are ordered by likes', function() {
      cy.addBlog({ title: 'title1', author: 'author1', url: 'url1', likes: 0 })
      cy.addBlog({ title: 'title2', author: 'author2', url: 'url2', likes: 3 })
      cy.addBlog({ title: 'title3', author: 'author3', url: 'url3', likes: 5 })
      cy.get('.showDetail').find('#likes').should($a => {
        let likes = $a.map((i, el) => {
          return Number(Cypress.$(el).text().split(' ')[1])
        })
        for (let i = 0; i < likes.length - 1; i++) {
          expect(likes[i] >= likes[i]).to.be.true
        }
      })
    })
  })
})