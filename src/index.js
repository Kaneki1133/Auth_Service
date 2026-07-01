const express = require(`express`);
const bodyParser = require(`body-parser`);

const apiRoutes = require(`./routes/index`);

const{User , Role} = require(`./models/index`);

const db = require(`./models/index`);

const app = express();

const { PORT } = require(`./config/serverConfig`);

const prepareAndStartServer = async () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use(`/api` , apiRoutes);

    app.listen(PORT , async ()=>{

        if(process.env.DB_SYNC){
            console.log("Synchronizing database columns...")
            db.sequelize.sync({alter:true});
            console.log("Database synchronized successfully.");
        }

        const u1 = await User.findByPk(8);      //* User With id=8 that is shlok
        const r1 = await Role.findByPk(1);     //* Role With id = 1 that is ADMIN
        //u1.addRole(r1);                       //* user.addRole(ADMIN)   so that means shlok role is now added as Admin 

        const response = await u1.hasRole(r1);
        //console.log(u1.dataValues.email);
        //console.log(r1.dataValues.name);
        console.log(`So Our User: ${u1.dataValues.email} has Role: ${r1.dataValues.name} is ${response}`);

        console.log(`Server Has Started at Port : ${PORT}`);
    })

}

prepareAndStartServer();