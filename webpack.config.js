const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    mode: "production",
    module: {
        rules: [
            {
              test: /\.js$/, // JavaScript files
              exclude: /node_modules/,
              use: 'babel-loader',
            },
            {
              test: /\.svg$/, // SVG files
              use: 'file-loader', // Use file-loader to handle SVG
            },
            {
              test: /\.(png|jpg|gif)$/i, // Other image files
              include: path.resolve(__dirname, 'public'),
              use: 'file-loader',
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "../manifest.json" },
            ],
        }),
        ...getHtmlPlugins(["index"]),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}