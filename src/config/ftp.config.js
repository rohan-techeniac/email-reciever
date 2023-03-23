const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

//Getting the env file path
dotenv.config({ path: path.join(__dirname, "../../.env") });

//Environments variable Schema
const envVarsSchema = Joi.object()
  .keys({
    FTPHOST: Joi.string().description("FTP Host Required.").required(),
    FTPPORT: Joi.number().required(),
    FTPUSER: Joi.string().description("FTP Username Required").required(),
    FTPPASS: Joi.string().description("FTP Password Required").required(),
    FTPLISTENERPATH: Joi.string()
      .description("FTP Listner Path Required")
      .required(),
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
  FTPHOST: envVars.FTPHOST,
  FTPPASS: envVars.FTPPASS,
  FTPUSER: envVars.FTPUSER,
  FTPPORT: envVars.FTPPORT,
  FTPLISTENERPATH: envVars.FTPLISTENERPATH,
};
