const { app } = require('@azure/functions');

app.http('CreateRequirement', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';
        var requirement = request.body;
        var data = JSON.stringify(requirement);
        console.log(`12--> ${data}`);
        return { body: `Hello, ${name}!, ${data}` };
    }
});
