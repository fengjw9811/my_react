// 输入
// 输出
// 插件

const path = require("path");
const fs = require("fs");
const { rollup, defineConfig } = require("rollup");
const typescript = require("@rollup/plugin-typescript");
const babel = require("@rollup/plugin-babel");

const packages = defineConfig([
  {
    name: "react",
    input: "packages/react/index.ts",
    output: [
      {
        file: "./dist/react/index.js",
        format: "esm",
        name: "react",
      },
    ],
    packageJson: {
      name: "react",
      version: "1.0.0",
      main: "index.js",
    },
  },
  {
    name: "jsx-runtime",
    input: "packages/react/jsx-runtime.ts",
    output: [
      {
        file: "./dist/react/jsx-runtime.js",
        format: "esm",
        name: "jsx-runtime",
      },
      {
        file: "./dist/react/jsx-dev-runtime.js",
        format: "esm",
        name: "jsx-dev-runtime",
      },
    ],
  },
  {
    name: "react-dom",
    input: "packages/react-dom/client.ts",
    output: [
      {
        file: "./dist/react-dom/client.js",
        format: "esm",
        name: "react-dom",
      },
    ],
    external: ["../react"],
    packageJson: {
      name: "react-dom",
      version: "1.0.0",
      main: "client.js",
    },
  },
]);

async function build() {
  for (const pkg of packages) {
    const config = {
      input: pkg.input,
      plugins: [
        babel({
          presets: ["@babel/preset-env"],
        }),
        typescript({
          tsconfig: "./tsconfig.json",
          exclude: ["**/*.test.ts"],
          declaration: true,
          declarationDir: path.dirname(pkg.output[0].file),
        }),
      ],
    };
    if (pkg.external) {
      config.external = pkg.external;
    }
    const bundle = await rollup(config);
    for (const output of pkg.output) {
      await bundle.write(output);
    }
    if (pkg.packageJson) {
      const targetDir = path.join("dist", pkg.packageJson.name);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(
        path.join(targetDir, "package.json"),
        JSON.stringify(pkg.packageJson, null, 2)
      );
    }
  }
}

build();
