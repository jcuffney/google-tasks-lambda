const { google } = require('googleapis')
const {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRY_DATE,
  CLIENT_ID,
  CLIENT_SECRET
} = process.env

const authorize = () => {
  const token = {
    access_token: ACCESS_TOKEN,
    refresh_token: REFRESH_TOKEN,
    scope: 'https://www.googleapis.com/auth/tasks',
    token_type: 'Bearer',
    expiry_date: parseInt(EXPIRY_DATE)
  }
  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET)
  oAuth2Client.setCredentials(token)
  return oAuth2Client
}

exports.handler = async (event, context, callback) => {
  const { detail } = event

  const task = {
    tasklist: '@default',
    resource: {
      ...JSON.parse(detail),
      due: new Date().toISOString()
    }
  }

  try {
    const auth = authorize()
    const { tasks } = google.tasks({ version: 'v1', auth })
    const res = await tasks.insert(task)
    callback(null, res)
  } catch (error) {
    callback(error, null)
  }
}
