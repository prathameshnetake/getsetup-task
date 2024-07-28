"use strict";

const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    libraryTarget: "this",
  },
  target: "node",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  externals: [nodeExternals()],
};
