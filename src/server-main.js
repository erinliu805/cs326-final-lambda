'use strict';
exports.__esModule = true;
var mongo_database_1 = require("./mongo-database");
var myserver_routing_1 = require("./myserver-routing");
var dotenv = require('dotenv');
dotenv.config();
var theDatabase = new mongo_database_1.Database('housing101');
var theServer = new myserver_routing_1.MyServer(theDatabase);
theServer.listen(process.env.PORT);
