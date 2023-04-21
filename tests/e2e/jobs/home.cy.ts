import { type JobEntity } from '@/server/domain/entities'

describe('Home', () => {
  before(() => {
    cy.intercept('GET', '/api/jobs', {
      fixture: 'jobs.json'
    })
  })

  it('Should display the jobs', () => {
    cy.visit('localhost:3000/')

    cy.fixture('jobs.json').then((jobs: JobEntity[]) => {
      const fetched = jobs.splice(0, 6)

      fetched.forEach((job) => {
        cy.contains(job.title)
      })
    })
  })

  it('Should search for a job', () => {
    cy.visit('localhost:3000/')

    cy.fixture('jobs.json').then((jobs: JobEntity[]) => {
      cy.get('input#search').type(jobs[5].title).blur()
      cy.contains(jobs[5].title)
    })
  })

  it('Should open the job details', () => {
    cy.visit('localhost:3000/')

    cy.fixture('jobs.json').then((jobs: JobEntity[]) => {
      cy.get('input#search').type(jobs[5].title).blur()
      cy.contains(jobs[5].title).click()
      cy.url().should('include', jobs[5].id)
    })
  })

  it('Should display the server-side error', () => {
    cy.intercept('GET', '/api/jobs', {
      statusCode: 500,
      body: {
        message: 'Something went wrong'
      }
    })

    cy.visit('localhost:3000/')

    cy.contains('Something went wrong')
  })
})
