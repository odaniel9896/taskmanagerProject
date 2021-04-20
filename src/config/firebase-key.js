module.exports = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": "dfbb63f72377ad9c5a052452d91c3f3eb9a7c51d",
  "private_key": process.env.FIREBASE_PROJECT_KEY.replace(/\\n/g, "\n"),
  "client_email": process.env.FIREBASE_PROJECT_EMAIL,
  "client_id": "102368464120850642636",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7fbvf%40tecnotcc-fb3e0.iam.gserviceaccount.com"
}
