// creating token and saving in cookie
const sendToken = (user, statusCode, res) => {
  const accessToken = user.getJWTToken();

  // options for cookie
  const options = {
    expire: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).json({ accessToken, message: "Login Success" });
};

module.exports = sendToken;
