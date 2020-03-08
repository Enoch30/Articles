describe('Home', () => {

  beforeEach(() => {
    //cy.visit("/"); 
  });

  //ensure page loads
  it('should load page', () => {
    cy.visit("/"); 
    cy.contains('h3', 'Articles Feed')
  })

  //check if the data is received from the server
  it('receives data from server', () => {
    cy.window().its('articles').should('have.length', 5)
  })

  //make sure it changes post
  it("should load next post", () => {
      let prevPost = cy.contains('Currently reading Article')
      cy.get('#next-post').click() 
      assert.notEqual(cy.contains('Currently reading Article'), prevPost, 'article changed')
  })

  //ensure posts do not appear twice
  it("should not repeat post", () => {
    cy.visit("/"); 

    // cy.window().its('articles.length').then(($data) => {
    //   var articlesLength = $data;
    //   cy.log(articlesLength);
    // })

    let prevPost = cy.contains('Currently reading Article')
    for(let i = 0; i < 4; i++){
      cy.get('#next-post').click() 
      assert.notEqual(cy.contains('Currently reading Article'), prevPost, 'article changed')
    }
  })

  //Ensure posts can be re-arranged
  it("should allow rearranging", () => {
      cy.get(".article-card").eq(2)
        .trigger('mousedown', { button: 0 })
        .wait(1500)
        .trigger('mousemove', {
          clientX: 70,
          clientY: 90,
          screenX: 70,
          screenY: 90,
          pageX: 70,
          pageY: 90
        })
        .trigger('mouseup', { force: true });
  })

  it("should allow submit rank", () => {
    cy.get('#submit-btn').click() 
    //should restart app
    cy.contains('4 unseen posts left')
    
  })
})