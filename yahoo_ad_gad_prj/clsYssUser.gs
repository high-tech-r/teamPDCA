class clsYssUser {
    constructor() {
    var bqAdap = new clsBqAdapter();
    var user_info = bqAdap.getCurrentUser()
    this.clientId = user_info['yss_client_id'];
    this.secret = user_info['yss_client_id'];
    this.refreshToken = user_info['yss_refresh_token'];
    this.accountId = user_info['yss_account_id'];
    this.mailAddress = user_info['yss_mail_address'];
  }
}
