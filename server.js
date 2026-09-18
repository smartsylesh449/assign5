const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;


const server = http.createServer(
    (request, response) => {

        let filePath;


        /* HOME PAGE */

        if (
            request.url === "/" ||
            request.url === "/index.html"
        ) {

            filePath =
                path.join(
                    __dirname,
                    "index.html"
                );

        }


        /* CSS */

        else if (
            request.url === "/style.css"
        ) {

            filePath =
                path.join(
                    __dirname,
                    "style.css"
                );

        }


        /* JAVASCRIPT */

        else if (
            request.url === "/script.js"
        ) {

            filePath =
                path.join(
                    __dirname,
                    "script.js"
                );

        }


        /* FILE NOT FOUND */

        else {

            response.writeHead(
                404,
                {
                    "Content-Type":
                        "text/plain"
                }
            );

            response.end(
                "404 - Page Not Found"
            );

            return;
        }


        /* READ FILE */

        fs.readFile(
            filePath,
            (error, data) => {

                if (error) {

                    response.writeHead(
                        500
                    );

                    response.end(
                        "Server Error"
                    );

                    return;
                }


                let contentType =
                    "text/html";


                if (
                    filePath.endsWith(".css")
                ) {

                    contentType =
                        "text/css";

                }


                if (
                    filePath.endsWith(".js")
                ) {

                    contentType =
                        "text/javascript";

                }


                response.writeHead(
                    200,
                    {
                        "Content-Type":
                            contentType
                    }
                );


                response.end(data);

            }
        );

    }
);


server.listen(
    PORT,
    () => {

        console.log(
            "================================="
        );

        console.log(
            "ShopZone Server Started"
        );

        console.log(
            "Open: http://localhost:3000"
        );

        console.log(
            "================================="
        );

    }
);