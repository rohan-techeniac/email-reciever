const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

//Getting the env file path
dotenv.config({ path: path.join(__dirname, "../../.env") });

//Environments variable Schema
const envVarsSchema = Joi.object()
  .keys({
    IMAPPORT: Joi.number().required(),
    IMAPHOST: Joi.string().description("Imap Host to connect to").required(),
    EMAIL: Joi.string().description("Emailaddress").required(),
    PASSWORD: Joi.string().description("Emailpassword").required(),
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
  EMAIL: envVars.EMAIL,
  EMAIL_PASSWORD: envVars.PASSWORD,
  IMAPPORT: envVars.IMAPPORT,
  IMAPHOST: envVars.IMAPHOST,
};
