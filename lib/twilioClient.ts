import { CallRequest } from './types';
import twilio from 'twilio';

/**
 * Start an outbound call via Twilio.
 * Reads credentials from environment variables:
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_PHONE_NUMBER
 *
 * It posts to your voice and status webhook endpoints, which should be
 * configured in your environment (NEXT_PUBLIC_BASE_URL) or on Twilio console.
 */
export async function startOutboundCall(call: CallRequest): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;
  if (!accountSid || !authToken || !fromNumber) {
    console.warn('Twilio credentials are missing; skipping outbound call.');
    return;
  }
  const client = twilio(accountSid, authToken);
  try {
    await client.calls.create({
      from: fromNumber,
      to: call.phoneNumber,
      url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/telephony/voice`,
      statusCallback: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/telephony/status`,
      statusCallbackEvent: ['initiated', 'ringing', 'completed']
    });
  } catch (error) {
    console.error('Error initiating Twilio call', error);
  }
}
