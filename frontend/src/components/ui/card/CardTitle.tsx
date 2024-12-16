import React, { ReactNode } from 'react';

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} data-v0-t="card.title">
      {children}
    </h3>
  );
}