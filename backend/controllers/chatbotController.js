const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel')
const dialogflow = require('@google-cloud/dialogflow');
const UserTempInfo = require('../model/tempInfoUserModel')
const dotenv = require('dotenv')
const dialogFlowSessionLanguageCode = require('../config/keys')
const { WebhookClient, Payload } = require('dialogflow-fulfillment')
const trendProduct = require('../model/trendingProductModel')
dotenv.config()

const projectId = process.env.GOOGLE_PROJECT_ID
const google_client_email = process.env.GOOGLE_CLIENT_EMAIL


const credentials = {
    client_email: google_client_email.toString(),
    private_key: process.env.NODE_ENV === 'production' ? JSON.parse(process.env.GOOGLE_PRIVATE_KEY) : process.env.GOOGLE_PRIVATE_KEY,
};


const sessionId = process.env.DIALOGFLOW_SESSION_ID
const sessionClient = new dialogflow.SessionsClient({ projectId: projectId.toString(), credentials })



const sendQuery = asyncHandler(async (req, res) => {
    let sessionPath = sessionClient.projectAgentSessionPath(
        projectId.toString(),
        sessionId + req.body.text.IdUser
    )
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text.mess,
                // The language used by the client (en-US)
                languageCode: dialogFlowSessionLanguageCode,
            },
        },
    };
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    if (result.action === 'recommendproducts-yes') {
        if (result.allRequiredParamsPresent) {
            const tempUser = new UserTempInfo({
                name: result.parameters.fields.name.stringValue,
                address: result.parameters.fields.address.stringValue,
                email: result.parameters.fields.email.stringValue,
                phone: result.parameters.fields.phone.stringValue,
            })
            await tempUser.save()
        }
    }

    res.json({
        'result': result
    })
})

const sendEvent = asyncHandler(async (req, res) => {
    let sessionPath = sessionClient.projectAgentSessionPath(
        projectId.toString(),
        sessionId + req.body.event.IdUser
    )
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                // The query to send to the dialogflow agent
                name: req.body.event.eventName,
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

const webHookDialogFlow = asyncHandler(async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res })
    function fallback(agent) {
        agent.add('I did\'t understand')
        agent.add('I\' am sorry, can you try again!')
    }
    function Batman(agent) {
        agent.add('This is batman fulfilment')

    }
    async function buyProducts(agent) {
        if (agent.parameters.products === '') {
            agent.add('Sorry! we do not sell this item')
            return;
        }
        const keyword = agent.parameters.products ? {
            name: {
                $regex: agent.parameters.products,
                $options: 'i'
            }
        } : {}
        let resWebHook
        const product = await Product.find({ ...keyword }).limit(1)
        if (product.length === 0) {
            agent.add('Sorry! we do not sell this item')
        } else {
            product[0].countMention++
            await product[0].save()
            resWebHook = {
                "text": "Here is the link to the product!. Please click ",
                "idProduct": product[0]._id
            }
            agent.add(new Payload(agent.UNSPECIFIED, resWebHook, { sendAsMessage: true, rawPayload: true }))
        }
    }

    async function getTopProduct(agent) {
        const products = await Product.find({}).sort({ rating: -1 }).limit(3)
        const dataPayLoad = {
            data: products
        }
        agent.add(new Payload(agent.UNSPECIFIED, dataPayLoad, { sendAsMessage: true, rawPayload: true }))
    }

    let intentMap = new Map()
    intentMap.set('Batman', Batman)
    intentMap.set('Default Fallback Intent', fallback)
    intentMap.set('buy product', buyProducts)
    intentMap.set('Top Product', getTopProduct)

    agent.handleRequest(intentMap)
})

module.exports = {
    sendQuery, sendEvent, webHookDialogFlow
}
