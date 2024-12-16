import React from 'react';
import { cn } from '@/src/lib/utils';

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

const ScrollArea: React.FC<ScrollAreaProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { ScrollArea };