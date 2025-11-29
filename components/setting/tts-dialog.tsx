"use client"

import React, { useEffect, useState, ReactNode, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface TTSDialogProps {
  children: ReactNode
  /** Texto inicial a ser lido */
  value?: string
  /** Título do dialog */
  title?: string
  /** Descrição do dialog */
  description?: string
}

export default function TTSDialog({ 
  children, 
  value, 
  title = "Text-to-Speech (TTS)",
  description = "Gere fala com a Web Speech API. Ajuste voz, velocidade, tom e volume."
}: TTSDialogProps) {
  const [text, setText] = useState(value || "Olá! Isso é uma demonstração de TTS no Next.js.")
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string>("")
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [volume, setVolume] = useState(1)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Verificar suporte ao TTS
  const isTTSSupported = typeof window !== "undefined" && "speechSynthesis" in window

  // Atualiza o texto caso a prop "value" mude externamente
  useEffect(() => {
    if (value !== undefined) setText(value)
  }, [value])

  // Carregar vozes
  useEffect(() => {
    if (!isTTSSupported) return

    const synth = window.speechSynthesis

    const loadVoices = () => {
      const availableVoices = synth.getVoices()
      // Ordenar: português primeiro, depois outras línguas
      const sortedVoices = [...availableVoices].sort((a, b) => {
        if (a.lang.includes("pt") && !b.lang.includes("pt")) return -1
        if (!a.lang.includes("pt") && b.lang.includes("pt")) return 1
        return a.name.localeCompare(b.name)
      })
      
      setVoices(sortedVoices)
      
      // Selecionar voz padrão em português se disponível
      if (!selectedVoice) {
        const defaultPortugueseVoice = sortedVoices.find(voice => 
          voice.lang.includes("pt")
        ) || sortedVoices[0]
        
        if (defaultPortugueseVoice) {
          setSelectedVoice(defaultPortugueseVoice.name)
        }
      }
    }

    // Carregar vozes imediatamente se já estiverem disponíveis
    if (synth.getVoices().length > 0) {
      loadVoices()
    }
    
    synth.addEventListener("voiceschanged", loadVoices)
    return () => synth.removeEventListener("voiceschanged", loadVoices)
  }, [isTTSSupported, selectedVoice])

  // Falar o texto
  const speak = useCallback(() => {
    if (!isTTSSupported) {
      alert("TTS não suportado neste navegador.")
      return
    }

    const synth = window.speechSynthesis
    
    // Se estiver pausado, retomar
    if (isPaused && synth.speaking) {
      synth.resume()
      setIsSpeaking(true)
      setIsPaused(false)
      return
    }

    // Cancelar fala atual se estiver falando
    if (synth.speaking) {
      synth.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(text)
    const voice = voices.find((v) => v.name === selectedVoice)
    
    if (voice) utterance.voice = voice
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = volume

    utterance.onstart = () => {
      setIsSpeaking(true)
      setIsPaused(false)
    }
    
    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }
    
    utterance.onerror = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }

    synth.speak(utterance)
  }, [text, voices, selectedVoice, rate, pitch, volume, isTTSSupported, isPaused])

  // Pausar a fala
  const pause = useCallback(() => {
    if (!isTTSSupported) return
    
    const synth = window.speechSynthesis
    if (synth.speaking && !synth.paused) {
      synth.pause()
      setIsPaused(true)
    }
  }, [isTTSSupported])

  // Parar a fala
  const stop = useCallback(() => {
    if (!isTTSSupported) return
    
    const synth = window.speechSynthesis
    synth.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
  }, [isTTSSupported])

  // Reiniciar a fala
  const restart = useCallback(() => {
    stop()
    setTimeout(speak, 100)
  }, [stop, speak])

  // Efeito para limpar ao desmontar o componente
  useEffect(() => {
    return () => {
      if (isTTSSupported) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isTTSSupported])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label htmlFor="tts-text" className="block text-sm font-medium mb-1">
              Texto para falar
            </label>
            <textarea
              id="tts-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Digite o texto que deseja ouvir..."
            />
          </div>

          {!isTTSSupported ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800 text-sm">
                Seu navegador não suporta a Web Speech API. 
                Experimente usar Chrome, Edge ou Firefox.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tts-voice" className="block text-sm font-medium mb-1">
                    Voz
                  </label>
                  <select
                    id="tts-voice"
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    disabled={voices.length === 0}
                  >
                    {voices.length === 0 && (
                      <option value="">Carregando vozes...</option>
                    )}
                    {voices.map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name} — {voice.lang} 
                        {voice.default && " (padrão)"}
                        {voice.lang.includes("pt") && " 🇧🇷"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Velocidade: <span className="text-blue-600">{rate.toFixed(1)}x</span>
                  </label>
                  <input
                    type="range"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.5x</span>
                    <span>1x</span>
                    <span>2x</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tom: <span className="text-blue-600">{pitch.toFixed(1)}</span>
                  </label>
                  <input
                    type="range"
                    min={0.1}
                    max={2}
                    step={0.1}
                    value={pitch}
                    onChange={(e) => setPitch(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Baixo</span>
                    <span>Normal</span>
                    <span>Alto</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Volume: <span className="text-blue-600">{volume.toFixed(1)}</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Mudo</span>
                    <span>Médio</span>
                    <span>Máximo</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button 
                  onClick={speak} 
                  disabled={isSpeaking && !isPaused}
                  className="flex-1 min-w-[120px]"
                >
                  {isPaused ? "Retomar" : isSpeaking ? "Falando..." : "Falar"}
                </Button>
                
                <Button 
                  variant="secondary" 
                  onClick={pause}
                  disabled={!isSpeaking || isPaused}
                  className="flex-1 min-w-[100px]"
                >
                  Pausar
                </Button>
                
                <Button 
                  variant="secondary" 
                  onClick={stop}
                  disabled={!isSpeaking && !isPaused}
                  className="flex-1 min-w-[100px]"
                >
                  Parar
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={restart}
                  disabled={!text.trim()}
                  className="flex-1 min-w-[100px]"
                >
                  Reiniciar
                </Button>
              </div>
            </>
          )}

          <p className="text-xs text-gray-500 pt-2 border-t">
            💡 Funciona melhor com Chrome, Edge e Firefox. Safari tem suporte parcial.
            {voices.some(v => v.lang.includes("pt")) && " Vozes em português disponíveis."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}