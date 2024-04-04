export interface userInfo {
  displayName: string
  email: string
  uid: string
  accessToken: string
  refreshToken: string
  jwt: string
  createdAt?: string
  expiryTime: number
}

export interface tokenInfo {
  accessToken: string
  refreshToken: string
  jwt: string
  uid: string
  email: string
  displayName: string
}

export interface meeingInfo {
  uid: string
  name: string
  description?: string
  mainPicture?: File
}
export type meetingParam = {
  mid: string
  uid: string
}