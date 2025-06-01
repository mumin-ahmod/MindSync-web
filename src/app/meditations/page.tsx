"use client";

import { useState } from 'react';
import { MeditationCard } from "@/components/features/meditations/MeditationCard";
import { sampleMeditations, meditationCategories } from "@/lib/placeholder-data";
import type { Meditation, Category } from "@/types";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

export default function MeditationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredMeditations = sampleMeditations.filter(meditation => {
    const matchesSearch = meditation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          meditation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || meditation.category.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Guided Meditations"
        description="Find peace and clarity with our collection of guided meditations."
        icon={meditationCategories[0].icon} 
      />

      <div className="sticky top-16 bg-background/95 backdrop-blur-sm z-10 py-4 -mt-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
          <div className="relative flex-grow w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search meditations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 h-auto">
            <TabsTrigger value="all" className="text-sm px-3 py-2">All</TabsTrigger>
            {meditationCategories.map((category: Category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm px-3 py-2">
                <category.icon className="w-4 h-4 mr-2 hidden sm:inline-block" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      {filteredMeditations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeditations.map((meditation: Meditation) => (
            <MeditationCard key={meditation.id} meditation={meditation} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">
          No meditations found matching your criteria. Try adjusting your search or filters.
        </p>
      )}
    </div>
  );
}
