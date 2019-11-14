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
