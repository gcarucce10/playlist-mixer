"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Music, Album, List, ArrowRight } from "lucide-react"
import Image from "next/image"
import type { Source } from "@/app/page"

interface SourceSelectorProps {
  sources: Source[]
  onSourcesSelected: (sources: Source[]) => void
}

export default function SourceSelector({ sources, onSourcesSelected }: SourceSelectorProps) {
  const [selectedSources, setSelectedSources] = useState<Source[]>([])

  const handleSourceToggle = (source: Source) => {
    setSelectedSources((prev) => {
      const isSelected = prev.some((s) => s.id === source.id)
      if (isSelected) {
        return prev.filter((s) => s.id !== source.id)
      } else if (prev.length < 2) {
        return [...prev, source]
      }
      return prev
    })
  }

  const handleContinue = () => {
    if (selectedSources.length === 2) {
      onSourcesSelected(selectedSources)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Selecione Duas Fontes
          </CardTitle>
          <CardDescription>
            Escolha 2 álbuns ou playlists para criar sua nova playlist mixada. Você pode combinar álbuns com playlists!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {sources.map((source) => {
              const isSelected = selectedSources.some((s) => s.id === source.id)
              const canSelect = selectedSources.length < 2 || isSelected

              return (
                <Card
                  key={source.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "ring-2 ring-purple-500 bg-purple-50"
                      : canSelect
                        ? "hover:shadow-md hover:scale-105"
                        : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => canSelect && handleSourceToggle(source)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox checked={isSelected} disabled={!canSelect} className="mt-1" />
                      <div className="flex-1 min-w-0">
                        <Image
                          src={source.cover || "/placeholder.svg"}
                          alt={source.name}
                          width={60}
                          height={60}
                          className="rounded-md mb-2"
                        />
                        <div className="flex items-center gap-1 mb-1">
                          {source.type === "album" ? (
                            <Album className="h-4 w-4 text-blue-500" />
                          ) : (
                            <List className="h-4 w-4 text-green-500" />
                          )}
                          <Badge variant="outline" className="text-xs">
                            {source.type}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-sm truncate">{source.name}</h3>
                        {source.artist && <p className="text-xs text-gray-600 truncate">{source.artist}</p>}
                        <p className="text-xs text-gray-500 mt-1">{source.musics.length} músicas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {selectedSources.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium mb-2">Fontes Selecionadas:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSources.map((source) => (
                  <Badge key={source.id} variant="default" className="flex items-center gap-1">
                    {source.type === "album" ? <Album className="h-3 w-3" /> : <List className="h-3 w-3" />}
                    {source.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleContinue}
              disabled={selectedSources.length !== 2}
              className="flex items-center gap-2"
            >
              Continuar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
