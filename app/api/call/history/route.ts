import { NextResponse } from 'next/server';
import { getCallHistory } from '@/lib/callHistory';

export async function GET() {
  try {
    const history = await getCallHistory();
    return NextResponse.json(history);
  } catch (error) {
    console.error('Error retrieving call history', error);
    return NextResponse.json({ error: 'Failed to retrieve call history' }, { status: 500 });
  }
}
