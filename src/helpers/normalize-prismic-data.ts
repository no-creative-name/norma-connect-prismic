import * as PrismicDocument from "prismic-javascript/d.ts/documents";
import ResolvedApi from "prismic-javascript/d.ts/ResolvedApi";
import { IContent } from "../interfaces/content";

export const normalizePrismicData = async (
    rawContentData: PrismicDocument.Document,
    api: ResolvedApi,
    alreadyNormalizedContents: {[key: string]: IContent} = {},
): Promise<IContent> => {
    if (!rawContentData) {
        throw new Error("Normalization of prismic data failed: input undefined");
    }

    const normalizedContent: IContent = {
        data: {},
        id: rawContentData.id,
        type: rawContentData.type,
    };

    // iterate over fields under data
    for (const fieldIdentifier of Object.keys(rawContentData.data)) {
        const contentField = rawContentData.data[fieldIdentifier];

        // if field is array...
        if (Array.isArray(contentField)) {
            const normalizedSubField = [];

            // ...iterate over array entries
            for (const contentObject of contentField) {

                // if is a seperate content to be fetched
                if (contentObject.type && contentObject.id) {
                    const subContentData =
                        alreadyNormalizedContents[contentObject.id] ||
                        await api.getByID(contentObject.id)
                            .then((res) => normalizePrismicData(res, api, alreadyNormalizedContents));
                    normalizedSubField.push(
                        {type: contentObject.type, data: subContentData.data, id: subContentData.id},
                    );
                } else if (contentObject[Object.keys(contentObject)[0]]) {
                    const subContent = contentObject[Object.keys(contentObject)[0]];

                    if (subContent.id) {
                        const subContentData =
                            alreadyNormalizedContents[subContent.id] ||
                            await api.getByID(subContent.id)
                                .then((res) => normalizePrismicData(res, api, alreadyNormalizedContents));
                        normalizedSubField.push(
                            {type: subContent.type, data: subContentData.data, id: subContentData.id},
                        );
                    } else {
                        normalizedSubField.push(contentObject);
                    }
                }
            }
            normalizedContent.data[fieldIdentifier] = normalizedSubField;
            alreadyNormalizedContents[rawContentData.id] = normalizedContent;
        } else {
            // if is a seperate content to be fetched
            if (contentField.id && contentField.type) {
                const contentFieldData =
                    alreadyNormalizedContents[contentField.id] ||
                    await api.getByID(contentField.id)
                        .then((res) => normalizePrismicData(res, api, alreadyNormalizedContents));
                normalizedContent.data[fieldIdentifier] = {
                    data: contentFieldData.data,
                    id: contentFieldData.id,
                    type: contentField.type,
                };
            } else {
                normalizedContent.data[fieldIdentifier] = contentField;
            }
            alreadyNormalizedContents[rawContentData.id] = normalizedContent;
        }
    }

    return normalizedContent;
};
