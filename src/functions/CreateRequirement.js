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

  async function connect() {
    try {
        var poolconnection = await sql.connect(config);
        var query = await poolconnection.request().query(`SELECT * FROM react.employees`);
        return query;
    } catch (error) {
        console.error(error);
    }
  }

app.http('CreateRequirement', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';
        var requirement = request.body;
        var data = JSON.stringify(requirement);
        console.log(`12--> ${data} DATA fetched successfully!`);
        var poolconnection = await sql.connect(config);
        var query = await poolconnection.request().query(`INSERT INTO react.employees (user_name,user_id,salary,city) VALUES('MoSamir','5',20000,${JSON.stringify(request.body)})`);
        console.log(`43--> ${JSON.stringify(query)}`);
        return { body: `Hello, ${name}!, ${data}` };
    }
    
});
