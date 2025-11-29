'use client';

import React, { useEffect, useRef, useState } from 'react';
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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SpeechToTextButtonProps {
  onResult: (text: string) => void;
  children?: React.ReactNode;
  className?: string;
  size?: 'icon' | 'lg' | 'sm';
  variant?: 'default' | 'ghost' | 'outline';
}

const SpeechToTextLineButton: React.FC<SpeechToTextButtonProps> = ({
  onResult,
  children,
  className,
  size = 'icon',
  variant = 'ghost',
}) => {
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState('pt-BR');
  const [interimText, setInterimText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInterimText(transcript);

        if (event.results[0].isFinal) {
          setListening(false);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setError(event.error);
        setListening(false);
      };

      recognition.onend = () => setListening(false);
    } else {
      setError('Reconhecimento de voz não suportado neste navegador.');
    }
  }, []);

  const startListening = () => {
    setInterimText('');
    setError(null);
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const handleConfirm = () => {
    if (interimText.trim()) {
      onResult(interimText.trim());
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size={size} className={cn(className)}>
          {children}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Falar para transcrever</AlertDialogTitle>
          <AlertDialogDescription>
            Escolha o idioma e clique em <b>Iniciar</b> para começar a falar.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-2">
          {/* Seleção de idioma */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="language">Idioma</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language" className="w-full">
                <SelectValue placeholder="Selecione o idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="es-ES">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botões de controle */}
          <div className="flex gap-2 justify-between">
            <Button
              onClick={startListening}
              disabled={listening}
              className="flex-1"
            >
              {listening ? 'Gravando...' : 'Iniciar'}
            </Button>
            <Button
              onClick={stopListening}
              disabled={!listening}
              variant="destructive"
              className="flex-1"
            >
              Parar
            </Button>
          </div>

          {/* Mensagem de erro */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Texto reconhecido */}
          <div>
            <Label>Texto capturado</Label>
            <div className="mt-1 p-3 border rounded-md bg-muted min-h-[60px] whitespace-pre-wrap text-sm">
              {interimText || '—'}
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Fechar</AlertDialogCancel>
          <AlertDialogAction
            disabled={!interimText.trim()}
            onClick={handleConfirm}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SpeechToTextLineButton;
