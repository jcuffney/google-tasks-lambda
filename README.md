# Google Tasks Automation

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

## Project Requirements:

- I want to be able to add a task to a task list at a specific time on a reoccuring basis
- I want to have all compleated tasks automatically cleared from my task list every day
- I want to have all events that were due in the past updated to be due today every day at midnight.

## Architecture

- CloudWatch Scheduled Events --> Lambda --> CloudWatch

## Technical Requirements

### Tooling

- Lambda Development (AWS SAM)
- Testing (SinonJS, Mocha)
- Linting (ESLint)
- Coverage (nyc)

### Notes

CloudWatch Scheduled Events
- fixed rate
- cron expression ([Schedule Expressions Using Rate or Cron - AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html))

Event Payload:

```
{
  "title": "Example Task Title",
  "details": "Example Task Detail",
}
```

Tasks will be due at the time that the lambada is executed.

`sam local invoke "AddTaskFunction" --event ./events/cw_scheduled_event.json --env-vars env.json`
`sam local invoke "ClearCompletedTasksFunction" --event ./events/cw_scheduled_event.json --env-vars env.json`

## Authentication (One Time Only)

> In order to run this 

1. Create a project and enable the API
  - https://developers.google.com/tasks/quickstart/nodejs
  - download the `credentials.json` and add it to the `/auth` directory
2. go to `/auth` 
3. run `npm i`
4. `node index.js`
5. follow the instructions in the terminal and then authorize the application to modify google tasks
6. add the values to a file named `env.json` you can use `env.sample.json` as a starter.

## Deployment Notes

1. make sure the `--profile` argument is correct in and run `./deploy`
2. run `./deploy`