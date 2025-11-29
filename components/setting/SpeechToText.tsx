"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js"
import RecordPlugin from "wavesurfer.js/dist/plugins/record"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, Square } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpeechToTextButtonProps {
  onResult: (text: string) => void
  children?: React.ReactNode
  className?: string
  size?: "icon" | "lg" | "sm" | "default"
  variant?: "default" | "ghost" | "outline" | "secondary"
}

const SpeechToTextButton: React.FC<SpeechToTextButtonProps> = ({
  onResult,
  children,
  className,
  size = "icon",
  variant = "ghost",
}) => {
  const recognitionRef = useRef<any>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const recordPluginRef = useRef<RecordPlugin | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [listening, setListening] = useState(false)
  const [language, setLanguage] = useState("pt-BR")
  const [interimText, setInterimText] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [isSupported, setIsSupported] = useState(true)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window === "undefined") return

    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognitionRef.current = recognition

      recognition.interimResults = true
      recognition.continuous = true
      recognition.maxAlternatives = 1

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("")
        setInterimText(transcript)
      }

      recognition.onerror = (event: any) => {
        console.error("[v0] Speech recognition error:", event.error)
        if (event.error === "no-speech") {
          setError("Nenhuma fala detectada. Tente novamente.")
        } else if (event.error === "not-allowed") {
          setError("Permissão de microfone negada.")
        } else {
          setError(`Erro: ${event.error}`)
        }
        setListening(false)
      }

      recognition.onend = () => {
        console.log("[v0] Speech recognition ended")
        setListening(false)
      }
    } else {
      setIsSupported(false)
      setError("Reconhecimento de voz não suportado neste navegador.")
    }
  }, [])

  // Initialize WaveSurfer with Record plugin
  useEffect(() => {
    if (!open || !containerRef.current || wavesurferRef.current) return

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "rgb(148, 163, 184)",
      progressColor: "rgb(59, 130, 246)",
      cursorWidth: 0,
      barWidth: 3,
      barGap: 2,
      barRadius: 2,
      height: 80,
      normalize: true,
      backend: "WebAudio",
    })

    const record = wavesurfer.registerPlugin(
      RecordPlugin.create({
        scrollingWaveform: true,
        renderRecordedAudio: false,
      }),
    )

    wavesurferRef.current = wavesurfer
    recordPluginRef.current = record

    return () => {
      record?.destroy()
      wavesurfer?.destroy()
      wavesurferRef.current = null
      recordPluginRef.current = null
    }
  }, [open])

  const startListening = async () => {
    setInterimText("")
    setError(null)

    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = language
        recognitionRef.current.start()
        setListening(true)

        // Start recording visualization
        if (recordPluginRef.current) {
          await recordPluginRef.current.startRecording()
        }
      } catch (err) {
        console.error("[v0] Error starting recognition:", err)
        setError("Erro ao iniciar gravação.")
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }

    if (recordPluginRef.current && recordPluginRef.current.isRecording()) {
      recordPluginRef.current.stopRecording()
    }

    setListening(false)
  }

  const handleConfirm = () => {
    if (interimText.trim()) {
      onResult(interimText.trim())
      setInterimText("")
      setOpen(false)
    }
  }

  const handleCancel = () => {
    stopListening()
    setInterimText("")
    setError(null)
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size={size} className={cn(className)}>
          {children || <Mic className="h-4 w-4" />}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Transcrição de Voz
          </AlertDialogTitle>
          <AlertDialogDescription>
            Selecione o idioma e clique em <strong>Iniciar</strong> para começar a gravar sua voz.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          {/* Language selection */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="language" className="text-sm font-medium">
              Idioma
            </Label>
            <Select value={language} onValueChange={setLanguage} disabled={listening}>
              <SelectTrigger id="language" className="w-full">
                <SelectValue placeholder="Selecione o idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="es-ES">Español (España)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Audio visualization */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Visualização de Áudio</Label>
            <div
              ref={containerRef}
              className="w-full h-20 border rounded-lg bg-muted/50 overflow-hidden flex items-center justify-center"
            >
              {!listening && <p className="text-sm text-muted-foreground">Aguardando gravação...</p>}
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex gap-3">
            <Button onClick={startListening} disabled={listening || !isSupported} className="flex-1 gap-2" size="lg">
              <Mic className="h-4 w-4" />
              {listening ? "Gravando..." : "Iniciar"}
            </Button>
            <Button
              onClick={stopListening}
              disabled={!listening}
              variant="destructive"
              className="flex-1 gap-2"
              size="lg"
            >
              <Square className="h-4 w-4" />
              Parar
            </Button>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Transcribed text */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Texto Transcrito</Label>
            <div className="p-4 border rounded-lg bg-muted/50 min-h-24 max-h-40 overflow-y-auto">
              {interimText ? (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{interimText}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">O texto aparecerá aqui...</p>
              )}
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={!interimText.trim()} onClick={handleConfirm}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default SpeechToTextButton
