// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//    res.statusCode = 200;
//    res.setHeader('Content-Type', 'text/plain');

//    var promiseAsync = async () => {
//       // await setTimeout(() => {
//       //       console.log('async without await'); //test await usage ny adding and removing
//       //    }, 3000);
      
//       console.log('function 1');
//       console.log('function 2');
//       console.log('function 3');
//       console.log('function 4');
//    }

//    promiseAsync().then(() => {
//       console.log('promise done');
//    });
//    console.log('Hello world')

//    res.end('Hello World');

// });

// server.listen(port, hostname, () => {
//    console.log(`Server running at http://${hostname}:${port}/`);
// });


const server = require("./src/server");

server.initialize();