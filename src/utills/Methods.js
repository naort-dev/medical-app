import moment from 'moment';
import AppColors from './AppColors';
export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

export const getAssetUrl = (url, assetUrl) => {
  return url.replace('wa://', assetUrl);
};

export const getAge = (dob) =>
  parseInt(moment(dob, 'DD/MM/YYYY').from(moment()).split(' ')[0]);

export const getProductColor = (type) =>
  type?.toUpperCase() === 'SATIVA'
    ? AppColors.sativa
    : type?.toUpperCase() === 'HYBRID'
    ? AppColors.hybrid
    : AppColors.indica;
