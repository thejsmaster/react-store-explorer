import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "index.tsx",
  output: {
    file: "index.js",
    format: "cjs",

    sourcemap: true,
  },
  plugins: [
    typescript(), // handle TypeScript files
    commonjs(), // convert CommonJS modules to ES6
    resolve(), // resolve node_modules
  ],
  external: ["react", "react-dom"], // Exclude React and ReactDOM from bundle
};
