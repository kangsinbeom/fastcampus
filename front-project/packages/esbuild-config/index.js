// 지금은 cjs 기반으로 만들어져있기에 import를 사용하지 않고 require를 사용할 것임
const { build } = require("esbuild");
/**
 * 엔트리포인트는 ts일 경우가 많은 것임 그리고
 * 패키지의 경우는 각각의 서비스에서 상이할테니 전달 받는 것이 좋고
 * 별도의 설정을 전달 받는다
 * 이후 내부에서 공통 요소를 가져온다.
 */
const run = ({ entryPoints = ["src/index.ts"], pkg, config = {} }) => {
  const dev = process.argv.includes("--dev");
  const minify = !dev;

  const watch = process.argv.includes("--watch");

  const external = Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies,
  });

  const baseConfig = {
    entryPoints,
    bundle: true,
    minify,
    sourcemap: true,
    outdir: "dist",
    target: "es2019",
    watch,
    external,
    ...config,
  };

  Promise.all([
    build({
      ...baseConfig,
      format: "esm",
    }),
    build({
      ...baseConfig,
      format: "cjs",
      outExtension: {
        ".js": ".cjs",
      },
    }),
  ]).catch(() => {
    console.error("Build failed");
    process.exit(1);
  });
};

module.exports = run;
