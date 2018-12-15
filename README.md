# Google Tasks Automation

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

## Project Requirements:

- I want to be able to add a task to a task list at a specific time on a reoccuring basis
- I want to have all compleated tasks automatically cleared from my task list every day
- I want to have all events that were due in the past updated to be due today every day at midnight.

## Architecture

- CloudWatch Scheduled Events --> Lambda --> CloudWatch
- Github --> CircleCI/TravisCI --> Cloudformation

## Areas of Learning
- Testing
- Terraform
- CircleCI

## Technical Requirements

#### ENV vars needed:
- TASK_LIST_ID
- <API INFO + ACCOUNT INFO>

#### Methods needed:
clear() - clears compleated tasks (run once per day @ midmight)
  - tasks.tasks.clear()
addTask() - adds task to task list
  - tasks.tasks.insert()
moveUncompletedToToday() - moves any uncompleated task from the past to the current day (run once per day @ midmight)

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
  "taskList": "12341234",
  "title": "Example Task Title",
  "details": "Example Task Detail",
}
```

tasks will be due at the time that the lambada is executed.

`sam local invoke "AddTaskFunction" --event ./events/cw_scheduled_event.json`
`sam local invoke "ClearCompletedTasksFunction" --event ./events/cw_scheduled_event.json`

---

## List of Events to Implement

- EveningTasks
- Morning Tasks
- Headspace Reminder
  - Sunday Evening @ 5PM
  - `cron(0 17 * * FRI *)`
- Laundary Reminder
  - Sunday Evening @ 5PM
  - `cron(0 17 * * FRI *)`
- Call Home Reminder
  - Sunday Evening @ 5PM
  - `cron(0 7 * * SAT *)`
- Retail Relay Reminder
  - Friday Morning @ 8AM
  - `cron(0 6 * * FRI *)`
- Financial Checkin Reminder
  - Saturday Morning @ 6AM
  - `cron(0 6 * * SAT *)`
- Add Gym To Calendar
  - Sunday Evening @ 5PM
  - `cron(0 17 * * SUN *)` 