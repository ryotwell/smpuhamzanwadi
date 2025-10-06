import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md text-center">
        <h1 className="text-5xl font-bold text-foreground mb-4">404</h1>
        <p className="text-base text-muted-foreground mb-8">
          Sorry, the page you are looking for could not be found.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Back to Home
        </Link>
      </div>
      <p className="mt-12 text-xs text-muted-foreground text-center">
        &copy; {new Date().getFullYear()} - TailAdmin
      </p>
    </div>
  );
}
