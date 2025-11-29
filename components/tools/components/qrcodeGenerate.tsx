interface QrcodeProp {
    state: string
    value: string
    qrCodeBase64: string
    geradoEm: string
}

// Como este componente apenas renderiza, não precisa ser async
export const QrCodeView = ({ output }: { output: QrcodeProp }) => {
    if (output.state !== "ready") {
        return (
            <div className="flex flex-col items-center justify-center p-6 text-gray-500">
                <span>Gerando QR Code...</span>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center bg-background gap-4 h-screen ">
            <img
                src={output.qrCodeBase64}
                alt="QR Code gerado"
                className="w-48 h-48  border"
            />
        </div>
    )
}
