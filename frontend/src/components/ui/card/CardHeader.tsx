import React, { ReactNode } from 'react';

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} data-v0-t="card.header">
      {children}
    </div>
  );
}