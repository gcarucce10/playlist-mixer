"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Shuffle, Download, RotateCcw, Clock } from "lucide-react"
import type { Source } from "@/app/page"

interface PlaylistGeneratorProps {
  sources: Source[]
  onReset: () => void
  onBack: () => void
}

interface GeneratedMusic {
  id: string
  title: string
  artist: string
  duration: string
  weight: number
  allowRepeated: boolean
  isRequired: boolean
  sourceId: string
  sourceName: string
  sourceType: "album" | "playlist"
}

export default function PlaylistGenerator({ sources, onReset, onBack }: PlaylistGeneratorProps) {
  const [playlistSize, setPlaylistSize] = useState(10)
  const [generatedPlaylist, setGeneratedPlaylist] = useState<GeneratedMusic[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePlaylist = async () => {
    setIsGenerating(true)

    // Simular delay de processamento
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const allMusics: GeneratedMusic[] = []

    // Adicionar todas as músicas com suas configurações
    sources.forEach((source) => {
      source.musics.forEach((music) => {
        allMusics.push({
          ...music,
          sourceId: source.id,
          sourceName: source.name,
          sourceType: source.type,
        })
      })
    })

    const playlist: GeneratedMusic[] = []
    const requiredMusics = allMusics.filter((music) => music.isRequired)

    // Adicionar músicas obrigatórias primeiro
    playlist.push(...requiredMusics)

    // Gerar o restante da playlist baseado nos pesos
    const remainingSlots = playlistSize - playlist.length
    const availableMusics = allMusics.filter((music) => !music.isRequired)

    for (let i = 0; i < remainingSlots; i++) {
      if (availableMusics.length === 0) break

      // Calcular probabilidades baseadas nos pesos
      const totalWeight = availableMusics.reduce((sum, music) => sum + music.weight, 0)
      let random = Math.random() * totalWeight

      let selectedMusic: GeneratedMusic | null = null
      for (const music of availableMusics) {
        random -= music.weight
        if (random <= 0) {
          selectedMusic = music
          break
        }
      }

      if (selectedMusic) {
        playlist.push(selectedMusic)

        // Se a música não permite repetição, remover das opções
        if (!selectedMusic.allowRepeated) {
          const index = availableMusics.findIndex((m) => m.id === selectedMusic!.id)
          if (index > -1) {
            availableMusics.splice(index, 1)
          }
        }
      }
    }

    // Embaralhar a playlist (mantendo as obrigatórias distribuídas)
    const shuffledPlaylist = [...playlist].sort(() => Math.random() - 0.5)

    setGeneratedPlaylist(shuffledPlaylist)
    setIsGenerating(false)
  }

  const calculateTotalDuration = () => {
    const totalSeconds = generatedPlaylist.reduce((total, music) => {
      const [minutes, seconds] = music.duration.split(":").map(Number)
      return total + minutes * 60 + seconds
    }, 0)

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const getSourceStats = () => {
    const stats = sources.map((source) => ({
      ...source,
      count: generatedPlaylist.filter((music) => music.sourceId === source.id).length,
    }))
    return stats
  }

  useEffect(() => {
    generatePlaylist()
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shuffle className="h-5 w-5" />
            Playlist Gerada
          </CardTitle>
          <CardDescription>Sua nova playlist foi criada com base nas configurações escolhidas!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configurações */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="playlist-size">Tamanho da Playlist</Label>
                <Input
                  id="playlist-size"
                  type="number"
                  value={playlistSize}
                  onChange={(e) => setPlaylistSize(Number(e.target.value))}
                  min={1}
                  max={50}
                  className="mt-1"
                />
              </div>

              <Button onClick={generatePlaylist} disabled={isGenerating} className="w-full flex items-center gap-2">
                {isGenerating ? (
                  <>
                    <RotateCcw className="h-4 w-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Shuffle className="h-4 w-4" />
                    Gerar Nova Playlist
                  </>
                )}
              </Button>

              {generatedPlaylist.length > 0 && (
                <div className="space-y-3">
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Estatísticas</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total de músicas:</span>
                        <span>{generatedPlaylist.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duração total:</span>
                        <span>{calculateTotalDuration()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Distribuição por Fonte</h4>
                    <div className="space-y-2">
                      {getSourceStats().map((source) => (
                        <div key={source.id} className="flex justify-between items-center text-sm">
                          <span className="flex items-center gap-1">
                            <Badge variant="outline" className="text-xs">
                              {source.type}
                            </Badge>
                            {source.name}
                          </span>
                          <span>{source.count} músicas</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Playlist */}
            <div className="lg:col-span-2">
              {isGenerating ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <RotateCcw className="h-8 w-8 animate-spin mx-auto mb-2 text-purple-600" />
                    <p>Gerando sua playlist personalizada...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {generatedPlaylist.map((music, index) => (
                    <Card key={`${music.id}-${index}`} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{music.title}</h4>
                            <p className="text-sm text-gray-600">{music.artist}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                            <Clock className="h-3 w-3" />
                            {music.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge variant={music.sourceType === "album" ? "default" : "secondary"} className="text-xs">
                              {music.sourceName}
                            </Badge>
                            {music.isRequired && (
                              <Badge variant="destructive" className="text-xs">
                                Obrigatória
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onReset} className="flex items-center gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Recomeçar
              </Button>
              {generatedPlaylist.length > 0 && (
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Exportar Playlist
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
