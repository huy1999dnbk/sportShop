import asyncHandler from 'express-async-handler'
import dialogFlow from '@google-cloud/dialogflow'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import { dialogFlowSessionLanguageCode } from '../config/keys.js'
dotenv.config()

const projectId = process.env.GOOGLE_PROJECT_ID
const google_client_email = process.env.GOOGLE_CLIENT_EMAIL


const credentials = {
    client_email: google_client_email.toString(),
    private_key: process.env.NODE_ENV === 'production' ? JSON.parse(process.env.GOOGLE_PRIVATE_KEY) : process.env.GOOGLE_PRIVATE_KEY,
};


const sessionId = process.env.DIALOGFLOW_SESSION_ID
const sessionClient = new dialogFlow.SessionsClient({ projectId: projectId.toString(), credentials })
const sessionPath = sessionClient.projectAgentSessionPath(
    projectId.toString(),
    sessionId
)


const sendQuery = asyncHandler(async (req, res) => {
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: dialogFlowSessionLanguageCode,
            },
        },
    };
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.json({
        'result': result
    })
})

const sendEvent = asyncHandler(async (req, res) => {
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                // The query to send to the dialogflow agent
                name: req.body.event,
                // The language used by the client (en-US)
                languageCode: dialogFlowSessionLanguageCode,
            },
        },
    };
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.json({
        'result': result
    })
})

export {
    sendQuery, sendEvent
}