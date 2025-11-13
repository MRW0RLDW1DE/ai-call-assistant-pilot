import { NextRequest, NextResponse } from 'next/server';

// Placeholder endpoint for Twilio voice/media webhooks
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('Received telephony voice callback', body);
  // TODO: handle Twilio voice callback here (e.g., return TwiML)
  return NextResponse.json({ received: true });
}
