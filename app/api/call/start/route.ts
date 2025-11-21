import { NextResponse } from 'next/server';
import { addCallEntry } from '@/lib/callHistory';
import twilio from 'twilio';

export async function POST(req: Request) {
  try {
    const { phoneNumber, scenario } = await req.json();
    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber =
      process.env.TWILIO_CALLER_NUMBER || process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      console.warn('Twilio credentials missing; skip call');
      return NextResponse.json({ error: 'Twilio credentials missing' }, { status: 500 });
    }

    const client = twilio(accountSid, authToken);
    const callbackUrl =
      `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/twiml/voice`;

    const call = await client.calls.create({
      from: fromNumber,
      to: phoneNumber,
      url: callbackUrl,
    });

    await addCallEntry({
      id: call.sid,
      phoneNumber,
      timestamp: Date.now(),
      status: 'initiated',
    });

    return NextResponse.json({ callSid: call.sid });
  } catch (error) {
    console.error('Error starting call', error);
    return NextResponse.json({ error: 'Failed to start call' }, { status: 500 });
  }
}
