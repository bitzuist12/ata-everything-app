import React, { ReactNode } from 'react';

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={`p-6 pt-0 ${className}`} data-v0-t="card.content">
      {children}
    </div>
  );
}