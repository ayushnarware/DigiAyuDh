import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <p className="text-8xl font-bold text-gradient">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you're looking for doesn't exist.</p>
      <Button variant="brand" className="mt-8" asChild>
        <Link to="/">Go home</Link>
      </Button>
    </div>
  );
}

export function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <p className="text-8xl font-bold text-destructive">403</p>
      <h1 className="mt-4 text-2xl font-bold">Access denied</h1>
      <p className="mt-2 text-muted-foreground">You don't have permission to view this page.</p>
      <Button variant="brand" className="mt-8" asChild>
        <Link to="/">Go home</Link>
      </Button>
    </div>
  );
}
