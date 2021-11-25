import { Command } from "commander";

import Spinner from "../tools/loader";

import { Editor } from "../tools/editor";
import { writeFile, unlink, readFile } from "fs";
import { watch } from "chokidar";
import { tmpdir } from "os";
import { resolve } from "path";
import { on } from "events";
import config from "../tools/config";

interface iStats {
  dev: number;
  mode: number;
  nlink: number;
  uid: number;
  gid: number;
  rdev: number;
  blksize: number;
  ino: number;
  size: number;
  blocks: number;
  atimeMs: number;
  mtimeMs: number;
  ctimeMs: number;
  birthtimeMs: number;
  atime: Date;
  mtime: Date;
  ctime: Date;
  birthtime: Date;
}
const spinner = new Spinner().spinner;
let fileStats: iStats,
  runntime: number = 0;
const editor = new Editor();

const TESTE = new Command("teste");
TESTE.helpOption("-h,--help", "User functionallity");
TESTE.description("Authenticate, show user status and logoff from API");

TESTE.action(async (options: any) => {
  const Name = "rodcordeiro",
    fileName = Buffer.from(Name).toString("base64"),
    tempDir = tmpdir(),
    file = resolve(`${tempDir}/${fileName}.txt`);

  const log = console.log.bind(console);

  const watcher = await watch(file, {
    persistent: true,
    ignoreInitial: false,
    followSymlinks: true,
    disableGlobbing: false,
    usePolling: false,
    interval: 100,
    binaryInterval: 300,
    alwaysStat: false,
    depth: 99,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100,
    },
    ignorePermissionErrors: false,
    atomic: true, // or a custom 'atomicity delay', in milliseconds (default 100)
  });
  writeFile(
    file,
    "",
    {
      encoding: "utf8",
      flag: "w+",
    },
    async (err) => {
      if (err) throw new Error(`${err}`);
      await editor.create(file);
    }
  );

  watcher.on("all", (event: any, path: any, stats: iStats) => {
    console.log({ event, stats, runntime });
    if (
      (event == "add" && runntime === 0) ||
      (event == "change" && runntime === 0)
    ) {
      fileStats = stats;
      runntime++;
    } else if (event == "change" && stats.size > fileStats.size) {
      readFile(file, "utf8", (err: any, data: any) => {
        console.log(data);
      });
      unlink(file, (err) => {
        if (err) throw err;
        watcher.close().then(() => console.log("closed"));
        editor.close();
      });
    }
  });
});

export default TESTE;
