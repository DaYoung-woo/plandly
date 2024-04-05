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