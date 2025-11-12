// 输入
// 输出
// 插件

import path from "path";
import { rollup, defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";

const packages = defineConfig([
  {
    name: "test",
    input: "packages/test/index.ts",
    output: [
      {
        file: "packages/test/dist/index.js",
        format: "umd",
        name: "Test",
      },
    ],
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
    const bundle = await rollup(config);
    for (const output of pkg.output) {
      await bundle.write(output);
    }
  }
}

build();
