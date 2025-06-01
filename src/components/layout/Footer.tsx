export function Footer() {
  return (
    <footer className="border-t bg-background/80 py-6 text-center text-sm text-muted-foreground">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} MindSync. All rights reserved.</p>
        <p className="mt-1">Nurturing peace, one breath at a time.</p>
      </div>
    </footer>
  );
}
