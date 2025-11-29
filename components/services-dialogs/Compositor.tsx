"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { sendMail } from "@/util/sendMail"

interface CompositorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  emails: string[]
}

export default function Compositor({ open, onOpenChange, emails }: CompositorProps) {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      alert("Por favor, preencha o assunto e a mensagem.")
      return
    }

    setIsSending(true)

    try {
      const result = await sendMail({
        to: emails,
        subject,
        text: message,
        html: `<p>${message.replace(/\n/g, "<br>")}</p>`,
      })

      if (result) {
        alert(`Email enviado com sucesso para ${emails.length} destinatário(s)!`)
        setSubject("")
        setMessage("")
        onOpenChange(false)
      } else {
        alert("Erro ao enviar email. Verifique as configurações.")
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error)
      alert("Erro ao enviar email.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enviar Email</DialogTitle>
          <DialogDescription>Enviando para {emails.length} destinatário(s)</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="recipients">Destinatários</Label>
            <div className="p-3 bg-muted rounded-md max-h-32 overflow-y-auto">
              <p className="text-sm text-muted-foreground">{emails.join(", ")}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Assunto</Label>
            <Input
              id="subject"
              placeholder="Digite o assunto do email..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isSending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={10}
              disabled={isSending}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSending}>
            Cancelar
          </Button>
          <Button onClick={handleSend} disabled={isSending || !subject.trim() || !message.trim()}>
            {isSending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Email"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
