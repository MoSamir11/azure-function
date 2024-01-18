const { app } = require('@azure/functions');
const mongoose = require("mongoose");
const user = require("./user");

app.http('CreateRequirement', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
    await mongoose
    .connect(
      "mongodb+srv://samiransari:big2lArHkSiRJ9Yk@cluster0.kkbskte.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("17--> Mongoose UserDB connected successfully"))
    .catch((err) => console.log(`18--> ${err}`));
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';
        var requirement = request.body;
        var data = JSON.stringify(requirement);
        console.log(`12--> ${data}`);
        var createData = await user.create({description: data});
        if(createData){
            console.log("27--> Data inserted Successfully!");
        } else{
            console.log("29--> Something went wrong");
        }
        return { body: `Hello, ${name}!, ${data}` };
    }
});