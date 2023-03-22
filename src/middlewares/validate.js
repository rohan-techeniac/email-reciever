const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("../utils/pick");

/**
 * 
 * @param {Object} schema 
 * @returns 
 */

//Validate Function to validate the schema object
const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    res.status(httpStatus.BAD_REQUEST).send({error: errorMessage});
    return;
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;