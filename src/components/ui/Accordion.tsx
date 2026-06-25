'use client';

import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
  title: string;
  content: string | ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  allowMultiple?: boolean;
}

export function AccordionItem({
  title,
  content,
  isOpen = false,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b border-ocean-700/50">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left transition-colors hover:text-ocean-300"
      >
        <span className="font-medium text-white pr-4">{title}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-ocean-400 transition-transform duration-300 flex-shrink-0',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-[1000px] pb-4' : 'max-h-0'
        )}
      >
        <div className="text-gray-400 leading-relaxed">{content}</div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { title: string; content: string | ReactNode }[];
  defaultOpen?: number | number[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  defaultOpen,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>(() => {
    if (defaultOpen === undefined) return [];
    if (typeof defaultOpen === 'number') return [defaultOpen];
    return defaultOpen;
  });

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems((prev) =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className={cn('', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openItems.includes(index)}
          onToggle={() => handleToggle(index)}
          allowMultiple={allowMultiple}
        />
      ))}
    </div>
  );
}
