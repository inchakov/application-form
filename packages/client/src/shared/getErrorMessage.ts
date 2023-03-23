
export default function getErrorMessage(error: unknown, defaultMessage?: string): string {
    return ((error instanceof Error) ? error.message : defaultMessage) ?? 'Something went wrong';
}