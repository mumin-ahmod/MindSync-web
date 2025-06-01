"use client";

import { useState, type ComponentProps } from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface BookmarkButtonProps extends Omit<ComponentProps<typeof Button>, 'onClick' | 'children'> {
  itemId: string;
  initialBookmarked?: boolean;
  onToggleBookmark?: (itemId: string, newBookmarkState: boolean) => void; // Optional: For server-side updates
  size?: 'sm' | 'default' | 'lg' | 'icon';
}

export function BookmarkButton({ 
  itemId, 
  initialBookmarked = false, 
  onToggleBookmark,
  size = 'icon',
  variant = 'ghost',
  className,
  ...props 
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const { toast } = useToast();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevents navigation if the button is inside a Link
    e.stopPropagation(); // Prevents event bubbling
    
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    if (onToggleBookmark) {
      onToggleBookmark(itemId, newBookmarkState);
    }
    toast({
      title: newBookmarkState ? "Bookmarked!" : "Bookmark removed",
      description: newBookmarkState ? "Added to your bookmarks." : "Removed from your bookmarks.",
      duration: 3000,
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={cn("rounded-full", className)}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      {...props}
    >
      <Bookmark className={cn("h-5 w-5 transition-colors", isBookmarked ? "fill-primary text-primary" : "text-muted-foreground")} />
    </Button>
  );
}
