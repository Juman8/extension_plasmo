import {onHideExtension} from "~features/ScrapperScreen/helper";

let isCheckFirstLogin = false;

export const setStatusOFLogin = (): void => {
  isCheckFirstLogin = true;
};