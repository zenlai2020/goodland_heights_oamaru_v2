/// <reference types="vite/client" />

declare global {
  interface Window {
    WeixinJSBridge?: {
      invoke(
        api: string,
        params: Record<string, unknown>,
        callback: (res: unknown) => void
      ): void
    }
  }
}

export {}
