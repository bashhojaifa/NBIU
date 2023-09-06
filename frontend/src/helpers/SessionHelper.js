class SessionHelper {
  static SetToken(token) {
    localStorage.setItem('uniAccessToken', token);
  }
  static GetToken() {
    return localStorage.getItem('uniAccessToken');
  }
  static RemoveToken() {
    return localStorage.removeItem('uniAccessToken');
  }
  static SetUserDetails(userDetails) {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }
  static GetUserDetails() {
    return JSON.parse(localStorage.getItem('userDetails'));
  }
  static RemoveUserDetails() {
    return localStorage.removeItem('userDetails');
  }
  static RecoverVerifyEmail(Email) {
    return localStorage.setItem('RecoverVerifyEmail', Email);
  }
  static GetRecoverVerifyEmail() {
    return localStorage.getItem('RecoverVerifyEmail');
  }
  static SetRecoverVerifyOTP(OTP) {
    return localStorage.setItem('RecoverVerifyOTP', OTP);
  }
  static GetRecoverVerifyOTP() {
    return localStorage.getItem('RecoverVerifyOTP');
  }

  static SetLanguage(Language) {
    localStorage.setItem('i18nextLng', Language);
  }
  static GetLanguage() {
    return localStorage.getItem('i18nextLng');
  }
  static SetTheme(Theme) {
    localStorage.setItem('Theme', Theme);
  }
  static GetTheme() {
    return localStorage.getItem('Theme');
  }

  static ResetStorage() {
    localStorage.removeItem('hellwetAccessToken');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('RecoverVerifyEmail');
    localStorage.removeItem('RecoverVerifyOTP');
    return true;
  }

  static ResetOtp() {
    localStorage.removeItem('RecoverVerifyEmail');
    localStorage.removeItem('RecoverVerifyOTP');
    return true;
  }
}

export default SessionHelper;
