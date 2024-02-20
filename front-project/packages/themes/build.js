import esbuild from "esbuild";

// 라이브러리를 만들기에 디펜던시가 굳이 번들링될 필요가 없다 그러니 빼주자
import pkg from "./package.json" assert { type: "json" };
const external = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

// 개발환경에서는 굳이 minify를 실행할 필요가 없으니 개발환경에서 실행이 안되게 해보자
const dev = process.argv.includes("--dev");
const minify = !dev;

/**
 * 코드가 변경되었을 때 바로바로 빌드가 되면 좋으니 16버전까지는 config에서 되는데
 * 이후에는 esbuild함수 내에서 따로 실행해야 함
 */

const watch = process.argv.includes("--watch");

const baseConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify,
  sourcemap: true,
  outdir: "dist",
  target: "es2019", // 빠르게 하기 위한 몇가지 라이브러리
  watch,
  external,
};
// 원하는 속성을 넣어보자
// esbuild.build({
//   entryPoints: ["src/Index.js"],
//   bundle: true,
//   minify: true,
//   sourcemap: true,
//   outdir: "dist",
//   format: "esm",
// });

// commonjs와 esmodule을 추가해보자
// outExtension을 통해서 단순히 덮어쓰기가 아닌 cjs에 대한 build를 만들 수 있다
// esbuild.build({
//   entryPoints: ["src/Index.js"],
//   bundle: true,
//   minify: true,
//   sourcemap: true,
//   outdir: "dist",
//   format: "cjs",
//   outExtension: {
//     ".js": ".cjs",
//   },
// });

/**
 * 이런 방식은 직렬로 하는 방식이기에 2배의 시간이 든다.
 * 그렇기에 병렬적으로 처리를 해보자 Promise.all
 */
Promise.all([
  esbuild.build({
    ...baseConfig,
    format: "esm",
  }),
  esbuild.build({
    ...baseConfig,
    format: "cjs",
    outExtension: {
      ".js": ".cjs",
    },
  }),
]).catch(() => {
  console.error("build failed");
  process.exit(1);
});

/**
 * 타입스크립트로 만들 수도 있고 선언도 할 수 있다
 * esbuild는 이러한 기능을 내장하고 있기에 그냥 쓰면 된다.
 */
