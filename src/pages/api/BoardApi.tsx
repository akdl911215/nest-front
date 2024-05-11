import { client } from "./Client";

interface ListParams {
  readonly take: number;
  readonly lastId?: string | null;
  readonly category?: string | null;
}
export const ListAPI = ({ take, lastId, category }: ListParams) => {
  let URL: string = `boards?take=${take}`;

  if (lastId) URL += `&lastId=${lastId}`;
  if (category) URL += `&category=${category}`;

  const res = client.get(URL);
  return res;
};

interface ReadParams {
  readonly id: string;
  readonly title: string;
}
export const ReadAPI = ({ id, title }: ReadParams) => {
  const URL: string = `boards/read?id=${id}&title=${title}`;

  return client.get(URL);
};

export interface SubmitParams {
  readonly category: string;
  readonly title: string;
  readonly content: string;
  readonly identifierId: string;
  readonly nickname: string;
  readonly images: File[]; // 이미지 파일 배열
  readonly videos: File[]; // 비디오 파일 배열
  readonly links: string[]; // URL 배열
  readonly youtubeLinks: string[]; // YouTube 링크 배열
}

export const SubmitAPI = async (params: SubmitParams) => {
  const URL: string = `boards/`;

  const res = await client.post(URL, params);
  return res;
};
