// Pass-through wrapper. Page transitions handled by browser-native @view-transition
// in globals.css (supported in Chromium/Edge/Safari TP).
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
