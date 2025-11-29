export function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + (sizes[i] || "");
}


export function formatMs(ms: number, decimals = 2) {
    if (ms < 1000) return `${ms.toFixed(decimals)} ms`;
    const seconds = ms / 1000;
    if (seconds < 60) return `${seconds.toFixed(decimals)} s`;
    const minutes = seconds / 60;
    return `${minutes.toFixed(decimals)} min`;
}


export function formatPercent(value: number) {
    return `${value * 100}`;
}


export const generateToken = (digit: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let link = '';
    for (let i = 0; i < digit; i++) {
        link += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return link;
};


// Função para gerar iniciais
export function getInitials(name: string | null): string {
  if (!name) return "?"
  return name
    .split(" ")
    .map((n) => n[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

// Função para definir cor do fallback
export function getFallbackColor(initials: string): string {
  const colors = [
    "bg-sky-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-violet-500",
    "bg-red-500",
    "bg-blue-500",
    "bg-orange-500",
  ]
  const hash = initials
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return colors[hash % colors.length]
}
