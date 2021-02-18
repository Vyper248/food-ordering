export const filterDeleted = (arr, ignoreHidden=false) => {
    return arr.filter(obj => {
        if (obj.deleted !== undefined) return false;
        return true;
    });
}