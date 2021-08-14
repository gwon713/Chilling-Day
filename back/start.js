const app_class = require('./app');
const logger = require('./config/winston');

const app = new app_class.App().app;
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    logger.info(`#    server on port ${port}     #`)
});