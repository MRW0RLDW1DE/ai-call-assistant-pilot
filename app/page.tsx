import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/calls/new');
  return null;
}
