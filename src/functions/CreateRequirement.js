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
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
    try{
    const name = request.query.get('name') || await request.text() || 'world';
    // // var keys = Object.keys(request.body);
    // var data = requirement.name;
    let testAccount = await nodemailer.createTestAccount();

    let transporter = await nodemailer.createTransport({
        host:"smtp.elasticemail.com",
        port: 2525,
        secure: false,
        auth:{
            user: "samir.ansari@quickelf.com",
            pass: "2B6BDF331C816DF92AB8867888A7070D4951"
        }
    });
    var data = await JSON.stringify(request.body);
    var query = JSON.stringify(request.query);
    var params = JSON.stringify(request.params);
    // var json = request.json();
    let info = await transporter.sendMail({
        from: '"Mohammad Samir 👻" <samir.ansari@quickelf.com>',
        to: 'mdsamiransari2000@gmail.com',
        subject: 'Receive Response',
        text: 'Hello World',
        html: `${request.body}, data: ${data}, query: ${query}, params: ${params}`

    });
    // var poolconnection = await sql.connect(config);
    // var query = await poolconnection.request().query(`INSERT INTO react.Customers(Description) VALUES(${JSON.stringify(context)})`)
    return { body: `Data inserted` };
    }catch(e){
        return {body: e}
    }
    }
});