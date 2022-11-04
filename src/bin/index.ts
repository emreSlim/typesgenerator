#!/usr/bin/env node

import * as fs from "fs";
import { isArgumentAKey, logError } from "../utils";
import * as path from "path";
import { getInterface } from "../lib/getInterface";

const args: string[] = process.argv.slice(2);

let sourcePath: string | undefined,
  targetPath: string | undefined,
  typeName: string | undefined;

for (let i = 0; i < args.length; i++) {
  let arg = args[i];
  const nextArg = args[i + 1];

  if (isArgumentAKey(arg) && !isArgumentAKey(nextArg)) {
    arg = arg.toLowerCase();
    switch (arg) {
      case "-s":
      case "--source-path":
        sourcePath = nextArg;
        break;
      case "-t":
      case "--target-path":
        targetPath = nextArg;
        break;
      case "-n":
      case "--type-name":
        typeName = nextArg;
        break;
    }
    i++; //skip next
  } else {
    continue;
  }
}

try {
  if (sourcePath) {
    if (fs.existsSync(sourcePath)) {
      fs.readFile(
        sourcePath,
        "utf-8",
        (err: NodeJS.ErrnoException | null, data: string) => {
          if (err) {
            throw err;
          } else {
            let inputFileName = "";
            if (sourcePath) {
              if (!targetPath) targetPath = path.dirname(sourcePath);
              inputFileName = path.basename(sourcePath, ".json");
            }
            const outFileName = typeName?.toLowerCase() ?? inputFileName;

            if (targetPath) {
              const outputPath: string = path.resolve(
                targetPath,
                outFileName + ".ts"
              );
              createInterfaceFile(JSON.parse(data), typeName, outputPath);
            }
          }
        }
      );
    } else {
      throw new Error("given source path doesn't exist");
    }
  } else {
    throw new Error(
      "source path to JSON not given. Please use -s ----source-path followed by json source path"
    );
  }
} catch (e: any) {
  logError(e.message);
}

export function createInterfaceFile(
  data: any,
  typeName: string | undefined,
  outputPath: string
) {
  const string = getInterface(data, typeName).trim();

  fs.writeFile(outputPath, string, { encoding: "utf-8" }, () => {
    console.log("Type file generated successfully:", outputPath);
  });
}
