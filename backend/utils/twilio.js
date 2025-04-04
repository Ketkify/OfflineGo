const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendOTP = async (phone) => {
  const verification = await client.verify.v2.services(process.env.TWILIO_VERIFY_SID)
    .verifications.create({ to: phone, channel: 'sms' });

  console.log(`📨 OTP sent to ${phone}: ${verification.sid}`);
  return verification;
};

const verifyOTP = async (phone, code) => {
  const verificationCheck = await client.verify.v2.services(process.env.TWILIO_VERIFY_SID)
    .verificationChecks.create({ to: phone, code });

  console.log(`📲 Twilio Verification Status for ${phone}: ${verificationCheck.status}`);
  return verificationCheck;
};

module.exports = { sendOTP, verifyOTP };
