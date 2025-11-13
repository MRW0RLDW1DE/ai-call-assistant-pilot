import { NextRequest, NextResponse } from 'next/server';

// Placeholder endpoint for Twilio status callbacks
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('Received telephony status callback', body);
  // TODO: handle Twilio status updates here
  return NextResponse.json({ received: true });
}
