const util = require("util");
const readline = require("readline");

// utility to read input from stdin sync
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
exports.getLine = (function () {
  const getLineGen = (async function* () {
    for await (const line of rl) {
      yield line;
    }
  })();
  return async () => (await getLineGen.next()).value;
})();

// promisified exec
exports.exec = util.promisify(require("child_process").exec);

/************
 * CONSTANTS
 *************/
exports.BUCKET_NAME = "simplifyy-configs";
exports.CONFIG_FILE_NAME = "web_public.env"; // on registry (i.e S3)
exports.CONFIG_FILE_PATH = ".env"; // within the project
exports.DEFAULT_AWS_REGION = "us-east-2";
exports.AWS_CONFIG_DIR = `${process.env.HOME}/.aws`;
exports.AWS_CONFIG_FILE_NAME = "credentials";

// paths are relevant to execution context
exports.ROOTS = {
  REPOSITORIES: "./src/repositories",
  SERVICES: "./src/services",
  RESOLVERS: "./src/graphql/resolvers",
  SCHEMAS: "./src/graphql/schemas",
};
