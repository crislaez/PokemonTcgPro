import { IonContent } from "@ionic/angular";
import { SwiperOptions } from "swiper";

export const trackById = (_: number, item: any): number => {
  return item?.id ?? item;
}

export const errorImage = (event): void => {
  event.target.src = '../../../../assets/images/image_not_found.png';
}

export const isNotEmptyObject = (object: any): boolean => {
  return Object.keys(object || {})?.length > 0 ? true : false
}

export const getObjectKeys = (obj: any): any => {
  return Object.keys(obj || {})
}

export const gotToTop = (content: IonContent): void => {
  content.scrollToTop(500);
}

export const sliceText = (text: string, long: number) => {
  return text?.length > long ? text?.slice(0, long) + '...' : text;
}

export const getSliderConfig = (info): SwiperOptions => {
  return {
      // slidesPerView: info?.length > 1 ? 2 : 1,
      slidesPerView: 2,
      spaceBetween: 30,
      freeMode: true,
      pagination:{ clickable: true },
      lazy: true,
      preloadImages: false
  }
}

export const appColors = {
  0:'#8F98FF',
  1:'#FB774D',
  2:'#4DC590',
  3:'#3C396E',
  4:'#E74C3C',
  5:'#B7B7B7',
  6:'#6C3483',
  7:'#C383E1',
  8:'#2874A6',
  9:'#1ABC9C',
}

export const cardColors = {
  'Colorless':'#E9DED6',
  'Darkness':'#3C3B3D',
  'Dragon':'#6F35FC',
  'Fairy':'#D685AD',
  'Fighting':'#F68635',
  'Fire':'#FB6C6C',
  'Grass':'#48D0B0',
  'Lightning':'#FFCE4B',
  'Metal':'#B7B7CE',
  'Psychic':'#F95587',
  'Water':'#6390F0',
  'Energy':'#795F4E',
  'Trainer':'#A39A9F',
}

export const getLastNumber = (number: number) => {
  return Number(number?.toString()?.slice(-1)) || 0;
}

export const getTypeImages = (type: string, allTypes: {type: string, image: string}[]): string => {
  return allTypes?.find(({type:storeType}) => storeType === type)?.image || '';
}

export const uniqueIdGeneratos = () => {
  let d = new Date().getTime();
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export const sortByDate = (array: any[], field: string) => {
  return [...(array ?? [])]?.sort((a, b) => {
    const aItem = new Date(a?.[field]);
    const bItem = new Date(b?.[field]);

    if(aItem < bItem) return 1
    if(aItem > bItem) return -1
    return 0;
  })
}

export enum EntityStatus {
  Initial = 'initial',
  Pending = 'pending',
  Loaded = 'loaded',
  Error = 'error'
};
