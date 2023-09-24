import * as esbuild from "esbuild";

try {
  await esbuild.build({
    entryPoints: ["./src/index.node.ts", "./src/index.browser.ts"],
    bundle: true,
    outdir: "./services/3030-app/lib",
    globalName: "PowDoneSDK",
    alias: {
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      buffer: "buffer",
      process: "process/browser",
      path: "path-browserify",
      util: "util",
      events: "events",
      querystring: "querystring-es3",
      url: "url",
      vm: "vm-browserify",
      fs: "browserify-fs",
    },
    bundle: true,
  });
  const outfiles = [
    "./services/3030-app/lib/index.node.js",
    "./services/3030-app/lib/index.browser.js",
  ];

  outfiles.forEach((file) => {
    // convert var PowDoneSDK to export const PowDoneSDK
    Bun.file(file)
      .text()
      .then((fileContent) => {
        const newFileContent = fileContent
          .toString()
          .replace("var PowDoneSDK", "export const PowDoneSDK");
        Bun.write(file, newFileContent);
      });
  });
} catch (e) {
  console.log(e);
}
