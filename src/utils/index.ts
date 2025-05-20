export function truncate(text: string, length: number): string {
    const words = text.split(" ");

    let truncated = "";
    for (const word of words) {
        if (truncated.length > length) {
            return `${truncated}...`;
        }

        truncated += ` ${word}`;
    }

    return truncated;
}
