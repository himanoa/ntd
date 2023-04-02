import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "@himanoa/ntd",
    version: Deno.args[0],
    description: "New type pattern definition support library",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/himanoa/ntd.git",
    },
    bugs: {
      url: "https://github.com/himanoa/ntd/issues",
    },
  },
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
