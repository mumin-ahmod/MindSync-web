import { sampleMeditations } from "@/lib/placeholder-data";
import type { Meditation } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, PlayCircle, Headphones, ListChecks } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookmarkButton } from "@/components/shared/BookmarkButton";
import { SectionTitle } from "@/components/shared/SectionTitle";

export default function MeditationDetailPage({ params }: { params: { id: string } }) {
  const meditation = sampleMeditations.find(m => m.id === params.id);

  if (!meditation) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold">Meditation not found</h1>
        <p className="text-muted-foreground mt-2">
          The meditation you are looking for does not exist or may have been removed.
        </p>
        <Button asChild className="mt-6">
          <Link href="/meditations">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Meditations
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
       <Button asChild variant="outline" className="mb-6">
        <Link href="/meditations">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Meditations
        </Link>
      </Button>

      <SectionTitle title={meditation.title} icon={meditation.category.icon} />

      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2">
          <div className="relative w-full h-64 md:h-auto">
            <Image
              src={meditation.coverImageUrl}
              alt={meditation.title}
              layout="fill"
              objectFit="cover"
              className="md:rounded-l-lg"
              data-ai-hint={meditation.coverImageHint || "meditation serene"}
            />
             <div className="absolute top-4 right-4">
               <BookmarkButton itemId={meditation.id} initialBookmarked={meditation.bookmarked} size="lg" />
             </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center gap-4 mb-2">
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  <Tag className="h-4 w-4 mr-2" />
                  {meditation.category.name}
                </Badge>
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  <Clock className="h-4 w-4 mr-2" />
                  {meditation.duration} minutes
                </Badge>
              </div>
              <CardDescription className="text-lg leading-relaxed">
                {meditation.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0 flex-grow space-y-4">
              <Separator />
              <div>
                <h3 className="text-md font-semibold mb-2 text-foreground">Benefits:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Reduces stress and anxiety</li>
                  <li>Improves focus and concentration</li>
                  <li>Promotes emotional health</li>
                  <li>Enhances self-awareness</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter className="p-0 mt-6 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="w-full sm:w-auto flex-grow">
                <PlayCircle className="mr-2 h-5 w-5" />
                Play Meditation
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto flex-grow" asChild>
                 <Link href={`/record?type=meditation&id=${meditation.id}&name=${encodeURIComponent(meditation.title)}&duration=${meditation.duration}`}>
                    <ListChecks className="mr-2 h-5 w-5" />
                    Log this Session
                 </Link>
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>

      {/* Placeholder for audio player or further details */}
      {meditation.audioUrl && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Headphones className="h-6 w-6 text-primary"/> Listen Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md text-center">
              <p className="text-muted-foreground">Audio player component will be here.</p>
              <p className="text-sm">Source: {meditation.audioUrl}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
