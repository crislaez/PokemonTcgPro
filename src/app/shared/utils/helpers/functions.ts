import { IonContent } from "@ionic/angular";

export const trackById = (_: number, item: any): number => {
  return item.id;
}

export const errorImage = (event): void => {
  event.target.src = '../../../../assets/images/image_not_found.png';
}

export const emptyObject = (object: any): boolean => {
  return Object.keys(object || {})?.length > 0 ? true : false
}

export const getObjectKeys = (obj: any): any => {
  return Object.keys(obj || {})
}

export const gotToTop = (content: IonContent): void => {
  content.scrollToTop(500);
}

export const sliceText = (text: string) => {
  return text?.length > 17 ? text?.slice(0, 17) + '...' : text;
}

export const sliceLongText = (text: string) => {
  return text?.length > 30 ? text?.slice(0, 30) + '...' : text;
}

export enum EntityStatus {
  Initial = 'initial',
  Pending = 'pending',
  Loaded = 'loaded',
  Error = 'error'
};
