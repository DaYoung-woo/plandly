export interface createVoteType {
  mid: string | number,
  uid: string | number,
  name: string,
  description: string,
  deadLine: Date | string,
  anonymousYn: number,
  addItemYn: number,
  locationFlag: number
}