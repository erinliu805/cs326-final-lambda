'use strict';

import { Database } from './mongo-database';
import { MyServer } from './myserver-routing';
let dotenv = require('dotenv');
dotenv.config();
console.log(process.env.USERNAME);
console.log(process.env.PASSWORD);
const theDatabase = new Database('housing101');
const theServer = new MyServer(theDatabase);
theServer.listen(8080);