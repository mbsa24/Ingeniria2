describe ('prueba cuenta bancaria', function(){

        it('prueba de login al sitio', function(){
            cy.visit('http://zero.webappsecurity.com')
            cy.get('.active > .custom > h4').contains('Online Banking')
            cy.get('#signin_button').click()
            cy.get('[name="user_login"]').type("username")
            cy.get('[name="user_password"]').type("password")
            cy.get('[name="submit"]').should('be.visible')
            cy.get('[name="user_login"]').should('be.visible')
            cy.get('[name="user_password"]').should('be.visible')
        })

})