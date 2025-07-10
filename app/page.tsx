"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { MusicIcon } from "lucide-react"
import SourceSelector from "@/components/source-selector"
import MusicParametrizer from "@/components/music-parametrizer"
import PlaylistGenerator from "@/components/playlist-generator"

export type Music = {
  id: string
  title: string
  artist: string
  duration: string
  weight: number
  isRequired: boolean
  allowRepeated: boolean
}

export type Source = {
  id: string
  name: string
  type: "album" | "playlist"
  artist?: string
  cover: string
  musics: Music[]
}

// Dados mockados
export const mockSources: Source[] = [
  {
    id: "1",
    name: "Abbey Road",
    type: "album",
    artist: "The Beatles",
    cover: "/placeholder.svg?height=200&width=200",
    musics: [
      {
        id: "1",
        title: "Come Together",
        artist: "The Beatles",
        duration: "4:19",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "2",
        title: "Something",
        artist: "The Beatles",
        duration: "3:03",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "3",
        title: "Maxwell's Silver Hammer",
        artist: "The Beatles",
        duration: "3:27",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "4",
        title: "Oh! Darling",
        artist: "The Beatles",
        duration: "3:26",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "5",
        title: "Here Comes the Sun",
        artist: "The Beatles",
        duration: "3:05",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
    ],
  },
  {
    id: "2",
    name: "Dark Side of the Moon",
    type: "album",
    artist: "Pink Floyd",
    cover: "/placeholder.svg?height=200&width=200",
    musics: [
      {
        id: "6",
        title: "Speak to Me",
        artist: "Pink Floyd",
        duration: "1:30",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "7",
        title: "Breathe",
        artist: "Pink Floyd",
        duration: "2:43",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "8",
        title: "Time",
        artist: "Pink Floyd",
        duration: "6:53",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "9",
        title: "Money",
        artist: "Pink Floyd",
        duration: "6:23",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "10",
        title: "Us and Them",
        artist: "Pink Floyd",
        duration: "7:49",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
    ],
  },
  {
    id: "3",
    name: "Rock Classics",
    type: "playlist",
    cover: "/placeholder.svg?height=200&width=200",
    musics: [
      {
        id: "11",
        title: "Bohemian Rhapsody",
        artist: "Queen",
        duration: "5:55",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "12",
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        duration: "8:02",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "13",
        title: "Hotel California",
        artist: "Eagles",
        duration: "6:30",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "14",
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        duration: "5:03",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
    ],
  },
  {
    id: "4",
    name: "Chill Vibes",
    type: "playlist",
    cover: "/placeholder.svg?height=200&width=200",
    musics: [
      {
        id: "15",
        title: "Weightless",
        artist: "Marconi Union",
        duration: "8:10",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "16",
        title: "Clair de Lune",
        artist: "Claude Debussy",
        duration: "5:20",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "17",
        title: "Mad World",
        artist: "Gary Jules",
        duration: "3:07",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
      {
        id: "18",
        title: "The Night We Met",
        artist: "Lord Huron",
        duration: "3:28",
        weight: 1,
        isRequired: false,
        allowRepeated: false,
      },
    ],
  },
]

export default function Home() {
  const [step, setStep] = useState<"select" | "parametrize" | "generate">("select")
  const [selectedSources, setSelectedSources] = useState<Source[]>([])
  const [parametrizedSources, setParametrizedSources] = useState<Source[]>([])

  const handleSourcesSelected = (sources: Source[]) => {
    setSelectedSources(sources)
    setStep("parametrize")
  }

  const handleParametrizationComplete = (sources: Source[]) => {
    setParametrizedSources(sources)
    setStep("generate")
  }

  const resetApp = () => {
    setStep("select")
    setSelectedSources([])
    setParametrizedSources([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MusicIcon className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Playlist Mixer</h1>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            A funcionalidade que faltava no Spotify - Crie playlists automáticas e randomizadas!
          </p>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Badge variant={step === "select" ? "default" : "secondary"} className="px-4 py-2">
              1. Selecionar Fontes
            </Badge>
            <Badge variant={step === "parametrize" ? "default" : "secondary"} className="px-4 py-2">
              2. Parametrizar
            </Badge>
            <Badge variant={step === "generate" ? "default" : "secondary"} className="px-4 py-2">
              3. Gerar Playlist
            </Badge>
          </div>
        </div>

        {/* Content */}
        {step === "select" && <SourceSelector sources={mockSources} onSourcesSelected={handleSourcesSelected} />}

        {step === "parametrize" && (
          <MusicParametrizer
            sources={selectedSources}
            onParametrizationComplete={handleParametrizationComplete}
            onBack={() => setStep("select")}
          />
        )}

        {step === "generate" && (
          <PlaylistGenerator sources={parametrizedSources} onReset={resetApp} onBack={() => setStep("parametrize")} />
        )}
      </div>
    </div>
  )
}
