import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST() {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();

  // Start streaming audio to AI service via WebSocket
  const start = response.start();
  start.stream({
    url: process.env.OPENAI_STREAM_URL || 'wss://example.com',
    track: 'both',
  });

  // Optionally pause briefly; Twilio will continue streaming
  response.pause({ length: 1 });

  return new Response(response.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  });
}
