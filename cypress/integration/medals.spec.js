/// <reference types="cypress" />
describe('App rendering', function() {
  it('successfully loads', () => {
    cy.visit('/')
  })

  it('renders the medals table', () => {
    cy.get('[data-qa="medalstable"]').should('exist')
  })
})

describe('Medals table sorting', () => {
  describe('Click sort by gold', () => {
    it('should list countries by gold medals', () => {
      cy.get('[data-sort-type="gold"]').click().should('have.class', 'sorted')
      cy.get('[data-qa-country-row]').should(($countries) => {
        expect($countries).to.have.length(10)
        expect($countries[0].getAttribute('data-qa-country-row')).to.equal('RUS')
        expect($countries[1].getAttribute('data-qa-country-row')).to.equal('NOR')
        expect($countries[2].getAttribute('data-qa-country-row')).to.equal('CAN')
      })
    })
  })

  describe('Click sort by silver', () => {
    it('should list countries by silver medals', () => {
      cy.get('[data-sort-type="silver"]').click().should('have.class', 'sorted')
      cy.get('[data-qa-country-row]').should(($countries) => {
        expect($countries).to.have.length(10)
        expect($countries[0].getAttribute('data-qa-country-row')).to.equal('RUS')
        expect($countries[1].getAttribute('data-qa-country-row')).to.equal('CAN')
        expect($countries[2].getAttribute('data-qa-country-row')).to.equal('AUT')
      })
    })
  })

  describe('Click sort by bronze', () => {
    it('should list countries by bronze medals', () => {
      cy.get('[data-sort-type="bronze"]').click().should('have.class', 'sorted')
      cy.get('[data-qa-country-row]').should(($countries) => {
        expect($countries).to.have.length(10)
        expect($countries[0].getAttribute('data-qa-country-row')).to.equal('USA')
        expect($countries[1].getAttribute('data-qa-country-row')).to.equal('NOR')
        expect($countries[2].getAttribute('data-qa-country-row')).to.equal('RUS')
      })
    })
  })

  describe('Click sort by total', () => {
    it('should list countries by total medals', () => {
      cy.get('[data-sort-type="total"]').click().should('have.class', 'sorted')
      cy.get('[data-qa-country-row]').should(($countries) => {
        expect($countries).to.have.length(10)
        expect($countries[0].getAttribute('data-qa-country-row')).to.equal('RUS')
        expect($countries[1].getAttribute('data-qa-country-row')).to.equal('USA')
        expect($countries[2].getAttribute('data-qa-country-row')).to.equal('NOR')
      })
    })
  })

})
