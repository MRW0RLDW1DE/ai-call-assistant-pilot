import { NextRequest, NextResponse } from 'next/server';
import { createCall, listCalls } from '../../../../lib/callStore';
import { startOutboundCall } from '../../../../lib/twilioClient';

export async function GET() {
  const calls = listCalls();
  return NextResponse.json({ calls });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, objective, context } = body;
    if (!phoneNumber || !objective || !context) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }
    const call = createCall({ phoneNumber, objective, context });
    // fire-and-forget call to Twilio
    startOutboundCall(call).catch((err) => console.error(err));
    return NextResponse.json({ success: true, callId: call.id, message: 'Call created' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: 'Error creating call' }, { status: 500 });
  }
}
