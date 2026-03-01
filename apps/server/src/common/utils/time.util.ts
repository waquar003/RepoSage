export function msToTime(ms: number): string {
    const seconds = ms / 1000;
    const minutes = seconds / 60;
    const secondsRemaining = Math.floor(seconds % 60);

    return `${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
}
