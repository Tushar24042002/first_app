export const shortLength = (text, len) => {
    return text != null  && text != undefined && text?.length > len ? `${text?.substring(0,len)}...` : text;
}