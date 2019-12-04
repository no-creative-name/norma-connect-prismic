import * as Prismic from "prismic-javascript";
import * as PrismicDocument from "prismic-javascript/d.ts/documents";
import ResolvedApi from "prismic-javascript/d.ts/ResolvedApi";
import { normalizePrismicData } from "./helpers/normalize-prismic-data";
import { ICmsAdapter } from "./interfaces/cms-adapter";
import { IPrismicConfig } from "./interfaces/prismic-config";

export class PrismicAdapter implements ICmsAdapter {
    public supportsFieldTypeWiseAdjustment = false;
    private client: Promise<ResolvedApi>;

    constructor(config: IPrismicConfig) {
        if (!config) {
            throw new Error("Creation of cms adapter failed: config is undefined");
        }
        this.client = Prismic.api(config.endpoint);
    }

    public async getNormalizedContentData(contentId: string, locale: string) {
        const api = await this.client;
        let res = await api.getByID(contentId);
        if (res.lang !== locale) {
            res = await this.fetchCorrectLanguageVersion(res, locale, api);
        }
        return normalizePrismicData(res, api);
    }

    public async fetchCorrectLanguageVersion(
        originalResult: PrismicDocument.Document,
        locale: string,
        api: ResolvedApi,
    ): Promise<PrismicDocument.Document> {
        const altLang = originalResult.alternate_languages.find(
            (alternateLang) => (alternateLang as any).lang === locale,
        );

        if (altLang) {
            return api.getByID((altLang as any).id);
        }
        return originalResult;
    }
}
