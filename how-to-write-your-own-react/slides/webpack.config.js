const path = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
};
