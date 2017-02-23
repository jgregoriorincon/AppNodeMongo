"use strict";
var mongoose = require("mongoose");
var app_1 = require("./app");
var port = process.env.PORT || 3977;
mongoose.connect('mongodb://localhost:27017/dbMusic', function (err, res) {
    if (err) {
        throw err;
    }
    else {
        console.log("La base de datos dbMusic se encuentra activa...");
        app_1.app.listen(port, function () {
            console.log("Servidor de api rest de musica escuchando en http://localhost:" + port);
        });
    }
});
//# sourceMappingURL=index.js.map