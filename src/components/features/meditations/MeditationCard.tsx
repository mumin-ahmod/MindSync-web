import type { Meditation } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Clock, Tag, PlayCircle } from "lucide-react";
import { BookmarkButton } from "@/components/shared/BookmarkButton";

interface MeditationCardProps {
  meditation: Meditation;
}

export function MeditationCard({ meditation }: MeditationCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="relative w-full h-48">
        <Image
          src={meditation.coverImageUrl}
          alt={meditation.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={meditation.coverImageHint || "meditation peaceful"}
        />
        <div className="absolute top-2 right-2">
          <BookmarkButton itemId={meditation.id} initialBookmarked={meditation.bookmarked} />
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-headline tracking-tight">{meditation.title}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <Tag className="h-4 w-4" />
          <span>{meditation.category.name}</span>
          <Clock className="h-4 w-4 ml-2" />
          <span>{meditation.duration} min</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <CardDescription className="line-clamp-3">{meditation.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/meditations/${meditation.id}`}>
            <PlayCircle className="mr-2 h-5 w-5" />
            Start Session
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
