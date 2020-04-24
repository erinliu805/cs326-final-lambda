'use strict';

import { Database } from './mongo-database';
import { MyServer } from './myserver-routing';

//const theDatabase = new Database('housing101');
const theServer = new MyServer('');
theServer.listen(8080);
