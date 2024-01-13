/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NEWT_SPACE_UID: string;
  readonly NEWT_CDN_API_TOKEN: string;
}

declare module "@pagefind/default-ui" {
  declare class PagefindUI {
    constructor(arg: any);
  }
}
