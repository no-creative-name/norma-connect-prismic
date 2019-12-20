import { PrismicAdapter } from "./main";
import Prismic = require("prismic-javascript");

describe("PrismicAdapter", () => {
    test("throws an error when created with undefined config", () => {
        expect(() => new PrismicAdapter(undefined)).toThrow(Error);
    });
    describe("fetchCorrectLanguageVersion", () => {
        test("calls API for correct alternate language", async () => {
            const adapter = new PrismicAdapter({endpoint: "https://xyz.com"});
            const mockResult = {
                alternate_languages: [
                    {
                        lang: "mockLang",
                        id: "x"
                    }
                ]
            };
            const mockLocale = "mockLang";
            const mockApi = {
                getByID: (id: string) => "works"
            };
            const result = await adapter.fetchCorrectLanguageVersion((mockResult as any), mockLocale, (mockApi as any));
            await expect(result).toEqual("works");
        });
        test("returns original result if alternate language is not available", async () => {
            const adapter = new PrismicAdapter({endpoint: "https://xyz.com"});
            const mockResult = {
                alternate_languages: [
                    {
                        lang: "wrongLang",
                        id: "x"
                    }
                ]
            };
            const mockLocale = "mockLang";
            const mockApi = {
                getByID: (id: string) => "works"
            };
            const result = await adapter.fetchCorrectLanguageVersion((mockResult as any), mockLocale, (mockApi as any));
            await expect(result).toEqual(mockResult);
        });
    });
});
