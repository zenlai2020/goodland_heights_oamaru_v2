/// <reference types="vite/client" />

interface WeixinJSBridge {
  invoke(
    api: string,
    params: Record<string, unknown>,
    callback: (res: unknown) => void
  ): void
}

declare global {
  interface Window {
    WeixinJSBridge?: WeixinJSBridge
  }
}
