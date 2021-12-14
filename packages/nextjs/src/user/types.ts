export interface ApiError {
  message: string
}

export interface ApiHookProps {
  onSuccess?: VoidFunction
  onError?: (error: ApiError) => void
}
