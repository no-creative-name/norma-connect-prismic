// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../prismic-javascript/d.ts/documents
//   ../prismic-javascript/d.ts/ResolvedApi

declare module 'norma-connect-prismic' {
    import * as PrismicDocument from "prismic-javascript/d.ts/documents";
    import ResolvedApi from "prismic-javascript/d.ts/ResolvedApi";
    import { ICmsAdapter } from "norma-connect-prismic/interfaces/cms-adapter";
    import { IPrismicConfig } from "norma-connect-prismic/interfaces/prismic-config";
    export class PrismicAdapter implements ICmsAdapter {
        supportsFieldTypeWiseAdjustment: boolean;
        constructor(config: IPrismicConfig);
        getNormalizedContentData(contentId: string, locale: string): Promise<import("./interfaces/content").IContent>;
        fetchCorrectLanguageVersion(originalResult: PrismicDocument.Document, locale: string, api: ResolvedApi): Promise<PrismicDocument.Document>;
    }
}

declare module 'norma-connect-prismic/interfaces/cms-adapter' {
    import { IContent } from "norma-connect-prismic/interfaces/content";
    export interface ICmsAdapter {
        supportsFieldTypeWiseAdjustment: boolean;
        getNormalizedContentData: (contentId: string, locale: string) => Promise<IContent>;
    }
}

declare module 'norma-connect-prismic/interfaces/prismic-config' {
    export interface IPrismicConfig {
        endpoint: string;
    }
}

declare module 'norma-connect-prismic/interfaces/content' {
    export interface IContent {
        type: string;
        data: IContentData;
        id: string;
    }
    export interface IContentData {
        [key: string]: {
            value: any;
            fieldType: string;
        };
    }
}

