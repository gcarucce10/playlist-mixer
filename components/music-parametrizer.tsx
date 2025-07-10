"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, Music, Settings, Album, List } from "lucide-react"
import Image from "next/image"
import type { Source, Music as MusicType } from "@/app/page"

interface MusicParametrizerProps {
  sources: Source[]
  onParametrizationComplete: (sources: Source[]) => void
  onBack: () => void
}

export default function MusicParametrizer({ sources, onParametrizationComplete, onBack }: MusicParametrizerProps) {
  const [parametrizedSources, setParametrizedSources] = useState<Source[]>(sources)

  const updateMusicParameter = (sourceId: string, musicId: string, parameter: keyof MusicType, value: any) => {
    setParametrizedSources((prev) =>
      prev.map((source) =>
        source.id === sourceId
          ? {
              ...source,
              musics: source.musics.map((music) => (music.id === musicId ? { ...music, [parameter]: value } : music)),
            }
          : source,
      ),
    )
  }

  const handleContinue = () => {
    onParametrizationComplete(parametrizedSources)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Parametrizar Músicas
          </CardTitle>
          <CardDescription>
            Configure o peso, obrigatoriedade e repetição para cada música das fontes selecionadas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {parametrizedSources.map((source, sourceIndex) => (
              <div key={source.id}>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={source.cover || "/placeholder.svg"}
                    alt={source.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {source.type === "album" ? (
                        <Album className="h-4 w-4 text-blue-500" />
                      ) : (
                        <List className="h-4 w-4 text-green-500" />
                      )}
                      <Badge variant="outline">{source.type}</Badge>
                    </div>
                    <h3 className="font-semibold">{source.name}</h3>
                    {source.artist && <p className="text-sm text-gray-600">{source.artist}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  {source.musics.map((music) => (
                    <Card key={music.id} className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Music className="h-4 w-4 text-gray-500" />
                            <div>
                              <h4 className="font-medium">{music.title}</h4>
                              <p className="text-sm text-gray-600">
                                {music.artist} • {music.duration}
                              </p>
                            </div>
                          </div>
                          <Badge variant="secondary">Peso: {music.weight}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Peso */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Peso ({music.weight})</Label>
                            <Slider
                              value={[music.weight]}
                              onValueChange={(value) => updateMusicParameter(source.id, music.id, "weight", value[0])}
                              max={5}
                              min={0.1}
                              step={0.1}
                              className="w-full"
                            />
                            <p className="text-xs text-gray-500">Maior peso = maior chance de aparecer</p>
                          </div>

                          {/* Obrigatório */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Obrigatório</Label>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={music.isRequired}
                                onCheckedChange={(checked) =>
                                  updateMusicParameter(source.id, music.id, "isRequired", checked)
                                }
                              />
                              <Label className="text-sm">{music.isRequired ? "Sim" : "Não"}</Label>
                            </div>
                            <p className="text-xs text-gray-500">Música deve aparecer na playlist</p>
                          </div>

                          {/* Permitir Repetição */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Permitir Repetição</Label>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={music.allowRepeated}
                                onCheckedChange={(checked) =>
                                  updateMusicParameter(source.id, music.id, "allowRepeated", checked)
                                }
                              />
                              <Label className="text-sm">{music.allowRepeated ? "Sim" : "Não"}</Label>
                            </div>
                            <p className="text-xs text-gray-500">Música pode aparecer mais de uma vez</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {sourceIndex < parametrizedSources.length - 1 && <Separator className="my-8" />}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <Button onClick={handleContinue} className="flex items-center gap-2">
              Gerar Playlist
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
