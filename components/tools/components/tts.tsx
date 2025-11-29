interface TTSOutput {
  state: string
  audioBase64Url: string
  description: string
  geradoEm: string
}

export const TTSView = ({ output }: { output: TTSOutput }) => {
  if (output.state !== "ready") {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <span>Gerando áudio...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center bg-background  gap-4 h-screen">
      <audio
        controls
        src={output.audioBase64Url}
        className="w-full max-w-sm"
      >
        Seu navegador não suporta o elemento de áudio.
      </audio>

      <div className="text-center">
        <p className="text-sm text-gray-700">
          <strong>Status:</strong> {output.description}
        </p>
        <p className="text-xs text-gray-400">
          <strong>Gerado em:</strong>{" "}
          {new Date(output.geradoEm).toLocaleString("pt-BR")}
        </p>
      </div>
    </div>
  )
}
