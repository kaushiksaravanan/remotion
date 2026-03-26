import { Config } from "@remotion/cli/config";
import { existsSync } from "fs";

// Use system Chrome on Windows when the bundled headless shell doesn't launch
const systemChrome =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

if (process.platform === "win32" && existsSync(systemChrome)) {
  Config.setBrowserExecutable(systemChrome);
}
