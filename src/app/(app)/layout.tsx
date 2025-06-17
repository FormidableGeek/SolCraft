
// No longer needs to import or use AppShell here as it's in the root layout.
export default function AppAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // Simply pass children through
}
