export default function apiHasError(
  response: unknown | APIError
): boolean {
  return (
    typeof response === 'object' && response !== null && 'reason' in response
  )
}
