export interface createVoteType {
  mid: string | number,
  uid: string | number,
  name: string,
  description: string,
  deadLine: string | null,
  anonymousYn: number,
  addItemYn: number,
  locationFlag: number
}
export interface voteOptionType {
  text: string,
  active: boolean,
  image?: File,
  previewImage?: string
}

export interface createVoteOptionReqBody {
  fileName?: string,
  name: string
}

export interface createVoteOptionType {
  image: File[],
  reqBody: createVoteOptionReqBody[],
}