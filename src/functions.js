export const filterDeleted = (arr, ignoreHidden=false) => {
    return arr.filter(obj => {
        if (obj.deleted !== undefined) return false;
        return true;
    });
}

export const getTotalQty = (items) => {
    let totalQty = 0;
    items.forEach(item => {
        let qty = item.qty;
        if (qty !== undefined) totalQty += qty;
    });
    return totalQty;
}