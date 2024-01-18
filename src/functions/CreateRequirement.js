const { app } = require('@azure/functions');
const sql = require('mssql');
const server = 'uatx-qa-sqlserver.database.windows.net';
const database = 'uatx-qa-sqldb';
const port = 1433;
const type = 'azure-active-directory-default';
const nodemailer = require('nodemailer');
const config = {
    server,
    port,
    database,
    authentication: {
        type: type,
    },
    options: {
        encrypt: true,
        // clientId: "3b7ef9f3-48fc-4d29-a9f8-3de02b79dac0"  // <----- user-assigned managed identity        
    }
  };
app.http('CreateRequirement', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
    console.log(`23--> ${JSON.stringify(context)}`)
    const name = request.query.get('name') || await request.text() || 'world';
    // // var keys = Object.keys(request.body);
    // var data = requirement.name;

    let testAccount = await nodemailer.createTestAccount();

    let transporter = await nodemailer.createTransport({
        host:"smtp.ethereal.email",
        port: 587,
        secure: false,
        auth:{
            user: "skyla.witting@ethereal.email",
            pass: "bjQCSdmk9NU1Awtm2N"
        }
    })

    let info = await transporter.sendMail({
        from: '"Mohammad Samir 👻" <skyla.witting@ethereal.email>',
        to: 'samir.ansari@quickelf.com',
        subject: 'Receive Response',
        text: 'Hello World',
        html: `${JSON.stringify(context)}`

    });
    console.log(`50--> ${info.messageId}`)
    // var poolconnection = await sql.connect(config);
    // var query = await poolconnection.request().query(`INSERT INTO react.Customers(Description) VALUES(${requirement})`)
    return { body: `Data inserted` };
    }
});