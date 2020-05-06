'use strict';

import { Database } from './mongo-database-stable';
import { MyServer } from './myserver-routing';
let dotenv = require('dotenv');
dotenv.config();
const theDatabase = new Database('housing101');
const theServer = new MyServer(theDatabase);
theServer.listen(process.env.PORT);