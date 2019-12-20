import Prismic = require("prismic-javascript");
import { normalizePrismicData } from "./normalize-prismic-data";
import { getByID, mockApiResult, mockApiNormalized } from "./__mock__/get-by-id";

const expectedInput = {
    alternate_languages: [],
    data: {
        prop1: "",
        prop2: 2,
        prop3: {
            subProp1: "",
            subProp2: [
                {
                    subSubProp1: "",
                },
                {
                    subSubProp1: "",
                },
            ]
        },
        prop4: {
            id: "xyz",
            type: "typeY"
        },
        prop5: [
            1, 2, 3
        ],
        prop6: [
            {
                content: {
                    id: "xyz",
                    type: "typeY"
                }
            }
        ]
    },
    first_publication_date: "",
    href: "string",
    id: "12345",
    lang: "de-de",
    last_publication_date: "",
    linked_documents: [],
    slugs: [],
    tags: [],
    type: "typeX",
    uid: "uid",
};

const expectedOutput = {
    data: {
        prop1: {
            fieldType: undefined,
            value: ""
        },
        prop2: {
            fieldType: undefined,
            value: 2
        },
        prop3: {
            fieldType: undefined,
            value: {
                subProp1: "",
                subProp2: [
                    {
                        subSubProp1: "",
                    },
                    {
                        subSubProp1: "",
                    },
                ]
            }
        },
        prop4: {
            fieldType: undefined,
            value: mockApiNormalized
        },
        prop5: {
            fieldType: undefined,
            value: [
                1, 2, 3
            ]
        },
        prop6: {
            fieldType: undefined,
            value: [
                mockApiNormalized
            ]
        }
    },
    id: '12345',
    type: "typeX",
};

describe("normalizePrismicData", () => {
    test("throws an error for undefined input", async () => {
        const api = await Prismic.api("https://headless-cms-adapter.cdn.prismic.io/api/v2");
        expect(normalizePrismicData(undefined, api).catch(() => {})).rejects;
    });
    test("correctly converts raw to normalized data", async () => {
        await expect(Prismic.api("https://headless-cms-adapter.cdn.prismic.io/api/v2")
            .then((api) => {
                api.getByID = jest.fn(getByID);
                const normalized = normalizePrismicData(expectedInput, api);
                return normalized;
            })).resolves.toEqual(expect.objectContaining(expectedOutput));
    });
});
