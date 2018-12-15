'use strict'

const { handler } = require('../index.js')
// const chai = require('chai')
// const expect = chai.expect

describe('AddTaskFunction', () => {
  let event, callback
  beforeEach(() => {
    event = {
      detail: JSON.stringify({
        title: 'some-title',
        details: 'some-details'
      })
    }
    callback = () => {}
  })

  it('constructs a task object from the event detail', async () => {
    await handler(event, null, callback)
  })
})
