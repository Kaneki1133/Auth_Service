const express = require(`express`);
const bodyParser = require(`body-parser`);

const apiRoutes = require(`./routes/index`);

const app = express();

const { PORT } = require(`./config/serverConfig`);

const prepareAndStartServer = async () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use(`/api` , apiRoutes);

    app.listen(PORT , ()=>{
        console.log(`Server Has Started at Port : ${PORT}`);
    })

}

prepareAndStartServer();