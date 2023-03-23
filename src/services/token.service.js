const config = require("../config");
const axios = require("axios");
/**
 *
 * @returns {Object}
 */

//Function to get the access token from the Microsoft Graph API
const accessTokenService = async () => {
  //SEtting up the Query Parameters
  const query_params = {
    client_id: config.app.CLIENT_ID,
    scope: config.app.SCOPES,
    username: config.app.EMAIL,
    password: config.app.EMAIL_PASSWORD,
    client_secret: config.app.CLIENT_SECRET,
    grant_type: "password",
  };
  const access_token_endpoint = config.app.ACCESS_TOKEN_URL;

  //Post request to the Microsoft Graph API
  return await axios
    .post(access_token_endpoint, query_params, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    })
    .then((response) => {
      return response.data;
    });
};

const refreshTokenService = async (code) => {
  //Setting up the refresh parameters
  const refresh_params = {
    client_id: config.app.CLIENT_ID,
    scope: config.app.SCOPES,
    refresh_token: code,
    client_secret: config.app.CLIENT_SECRET,
    grant_type: "refresh_token",
  };

  const refresh_token_endpoint = `${config.COMMON}/oauth2/v2.0/token?`;

  //Post Request to refresh token endpoint
  return await axios
    .post(refresh_token_endpoint, refresh_params, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    })
    .then((response) => {
      return response.data;
    });
};

module.exports = {
  refreshTokenService,
  accessTokenService,
};
