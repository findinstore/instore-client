import moment from 'moment';

export const truncaterText = (stringLength, string) => {
  if (!string) return;
  var truncationString = "...";
  var subStringEnd = stringLength - truncationString.length;
  if ( string.length >= stringLength ) {
    return string.substring(0, subStringEnd) + truncationString;
  } else {
    return string;
  }
};

export default {
  truncaterText
};