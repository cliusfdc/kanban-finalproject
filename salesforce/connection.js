const nforce = require("nforce");

/**
 * Creates connection to Salesforce CRM
 */

module.exports = nforce.createConnection({
  clientId:
    "3MVG9vtcvGoeH2bj7rhEJoB6aU4aFoymZrCVeaHj2tdDjkYxDqLD1p57PXA_iXwZ8hPtWQC9HMQVrEB.7kR2z",
  clientSecret:
    "6531D7DE9A8E3FB8CF7DCCC3B198732CD4132F5190E186A581BE508FCC17C5A4",
  redirectUri: "https://login.salesforce.com/services/oauth2/success",
  apiVersion: "v43.0",
  mode: "single",
  autoRefresh: true,
  username: "omcclave@trilogybootcamp2019.demo",
  password: "salesforce1sQYFTwwrmISkOZ2wuyavD2MZw",
  oauth: {
    access_token:
      "6Cel800D3i000000D2N48883i0000004PkQhniIVnEwWl3dc8ECADGvbBr6b0T2fpzFcArDn23K8xeT3SCb21tDkljuPCQwY2z6SMT8ULeM",
    instance_url: "https://na112.my.salesforce.com"
  }
});
