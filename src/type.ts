export interface chatProps {
  name: string;
  msg: string;
  color: string;
  senderId: string;
  dateSent: number;
}
export interface contextProp {
  children: JSX.Element;
}
export enum FormEnum {
  EXISTS = "exists",
  SUCCESS = "success",
}
export enum payloadType {
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD = "password",
  AVATAR = "avatar",
  ID = "id",
}
