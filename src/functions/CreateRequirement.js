const { app } = require('@azure/functions');
const sql = require('mssql');
const server = 'uatx-qa-sqlserver.database.windows.net';
const database = 'uatx-qa-sqldb';
const port = 1433;
const type = 'azure-active-directory-default';
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
    var requirement = await JSON.parse(JSON.stringify(context.extraInputs.name));
    // // var keys = Object.keys(request.body);
    // var data = requirement.name;
    var poolconnection = await sql.connect(config);
    var query = await poolconnection.request().query(`INSERT INTO react.Customers(Description) VALUES(${requirement})`)
    return { body: `Data inserted` };
    }
});