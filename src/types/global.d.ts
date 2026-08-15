declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    // Meta Pixel. Installed by the stub in MetaPixel.tsx; its presence is the
    // "Meta is enabled" signal read by src/lib/meta-pixel.ts.
    fbq: (
      method: 'track' | 'trackCustom' | 'init',
      eventName: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string },
    ) => void;
    _fbq?: unknown;
  }
}
export {};
