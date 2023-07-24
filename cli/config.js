const { Readable } = require("stream");
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs");

const {
  BUCKET_NAME,
  CONFIG_FILE_NAME,
  CONFIG_FILE_PATH,
  DEFAULT_AWS_REGION,
  getLine,
} = require("./helpers");

const client = new S3Client({
  region: DEFAULT_AWS_REGION,
});

const getConfigFromStorage = async (env) => {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `${env}/${CONFIG_FILE_NAME}`,
    });
    const { Body } = await client.send(command);
    await new Promise((resolve, reject) => {
      if (Body instanceof Readable) {
        Body.pipe(fs.createWriteStream(CONFIG_FILE_PATH))
          .on("error", (err) => reject(err))
          .on("close", () => resolve(true));
      }
    });
  } catch (error) {
    console.error("Failed to get config from S3 ", error);
  }
};

const setConfigToStorage = async (env) => {
  try {
    const data = fs.readFileSync(CONFIG_FILE_PATH);
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `${env}/${CONFIG_FILE_NAME}`,
      Body: data,
    });
    const { httpStatusCode } = await client.send(command);
    if (httpStatusCode === 200) {
      return true;
    }
  } catch (error) {
    console.error("Failed to set config to S3 ", error);
  }
};

/**
 * Ask user about the desired environment
 * @returns
 */
const getDesiredEnv = async () => {
  console.log("Please provide env (local/dev/staging/prod):?");
  return await getLine();
};

const main = async () => {
  const args = process.argv.slice(2);
  const env = await getDesiredEnv();

  if (args[0] === "--get") {
    await getConfigFromStorage(env);
  } else if (args[0] === "--set") {
    await setConfigToStorage(env);
  }

  // exit gracefully
  process.exit(0);
};

main();
