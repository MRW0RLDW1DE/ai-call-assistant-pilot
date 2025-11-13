export const metadata = {
  title: 'AI Call Assistant Pilot',
  description: 'Pilot app for outbound call assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="p-4">
        {children}
      </body>
    </html>
  );
}
