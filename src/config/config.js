const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

//Getting the env file path
dotenv.config({ path: path.join(__dirname, "../../.env") });

//Environments variable Schema
const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    IMAPPORT: Joi.number().required(),
    IMAPHOST: Joi.string().description("Imap Host to connect to").required(),
    CLIENT_ID: Joi.string().description("Client ID").required(),
    CLIENT_SECRET: Joi.string().description("Client Secret").required(),
    SCOPES: Joi.string().description("Scopes").required(),
    AUTHORITY: Joi.string().description("Common").required(),
    EMAIL: Joi.string().description("Emailaddress").required(),
    PASSWORD: Joi.string().description("Emailpassword").required(),
    ACCESS_TOKEN_URL: Joi.string().description("AccessTokenUrl").required(),
  })
  .unknown();

// getting the values from process.env and validate them
const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

//exporting the values
module.exports = {
  PORT: envVars.PORT,
  CLIENT_ID: envVars.CLIENT_ID,
  CLIENT_SECRET: envVars.CLIENT_SECRET,
  SCOPES: envVars.SCOPES,
  COMMON: envVars.AUTHORITY,
  EMAIL: envVars.EMAIL,
  EMAIL_PASSWORD: envVars.PASSWORD,
  ACCESS_TOKEN_URL: envVars.ACCESS_TOKEN_URL,
  IMAPPORT: envVars.IMAPPORT,
  IMAPHOST: envVars.IMAPHOST,
};
