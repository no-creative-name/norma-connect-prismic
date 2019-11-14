import { Document } from "prismic-javascript/d.ts/documents";

export const mockApiResult = {
    alternate_languages: [],
    data: {
        a: "x",
    },
    first_publication_date: "",
    href: "string",
    id: "9",
    lang: "de-de",
    last_publication_date: "",
    slugs: [],
    tags: [],
    type: "typeY",
    uid: "uid",
};

export const mockApiNormalized = {
    data: {
        a: {
            fieldType: undefined,
            value: "x",
        },
    },
    id: mockApiResult.id,
    type: mockApiResult.type,
};

export const getByID = (id: string): Promise<Document> => new Promise((resolve, reject) => {
    process.nextTick(() => resolve(mockApiResult));
});
