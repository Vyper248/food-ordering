import { format } from 'date-fns';

const initialState = {
    page: 'Home',
    website: '1',
    user: null,
    message: {
        text: '',
        type: ''
    },
    lastSync: 0,
    fetching: false,
    currentItem: 0,
    orderList: [
        {
            id: '2',
            order: 2,
            name: 'Cornflakes',
            category: 1,
            qty: 2,
            details: {
                1: {
                    size: '',
                    url: 'https://groceries.asda.com/product/cornflakes-crunchy-nut/kelloggs-corn-flakes-cereal/1000121939238',
                    note: ''
                },
                2: {
                    size: '',
                    url: '',
                    note: ''
                }
            }
        },
        {
            name: 'Tortellini',
            id: undefined,
            order: 3,
            category: 1,
            qty: 4,
            details: {
                1: {
                    size: '',
                    url: '',
                    note: ''
                },
                2: {
                    size: '',
                    url: '',
                    note: ''
                }
            }
        }
    ],
    items: [
        {
            id: '1',
            order: 1,
            name: 'Weetabix',
            category: '1',
            details: {
                1: {
                    size: '48PK',
                    url: 'https://groceries.asda.com/product/wheat-biscuits-mini-wheats/asda-wheat-bisks/21056',
                    note: 'Cheap Ones!'
                },
                2: {
                    size: '24PK',
                    url: '',
                    note: ''
                }
            }
        },
        {
            id: '2',
            order: 2,
            name: 'Cornflakes',
            category: '1',
            details: {
                1: {
                    size: '',
                    url: 'https://groceries.asda.com/product/cornflakes-crunchy-nut/kelloggs-corn-flakes-cereal/1000121939238',
                    note: ''
                },
                2: {
                    size: '',
                    url: '',
                    note: ''
                }
            }
        },
        {
            id: '3',
            order: 1,
            name: 'Buttery Spread',
            category: '4',
            details: {
                1: {
                    size: '',
                    url: '',
                    note: ''
                },
                2: {
                    size: '',
                    url: '',
                    note: ''
                }
            }
        },
        {
            id: '4',
            order: 1,
            name: 'Flour',
            category: '3',
            details: {
                1: {
                    size: '',
                    url: '',
                    note: ''
                },
                2: {
                    size: '',
                    url: '',
                    note: ''
                }
            }
        },
    ],
    categories: [
        {
            id: '1',
            name: 'Cereals',
            column: 1,
            page: 1,
            rowsAfter: 1,
            order: 0,
        },
        {
            id: '2',
            name: 'Tinned/Cans',
            column: 1,
            page: 1,
            rowsAfter: 1,
            order: 1,
        },
        {
            id: '3',
            name: 'Dry Goods',
            column: 2,
            page: 1,
            rowsAfter: 1,
            order: 2,
        },
        {
            id: '4',
            name: 'Chilled',
            column: 1,
            page: 2,
            rowsAfter: 1,
            order: 3,
        },
    ],
    websites: [
        {
            id: '1',
            name: 'ASDA',
            searchURL: 'https://groceries.asda.com/search/',
            forceDownload: true
        },
        {
            id: '2',
            name: 'Tesco',
            searchURL: 'https://www.tesco.com/groceries/en-GB/search?query=',
            forceDownload: false
        }
    ],
};

export const reducer = (state = initialState, action) => {
    let value = action.payload;
    let dateValue = Number(format(new Date(),'yyyyMMddHHmmss'));
    let newArray;
    switch(action.type) {
        case 'SET_PAGE': return {...state, page: value};
        case 'SET_USER': return {...state, user: value};
        case 'SET_MESSAGE': return {...state, message: value};
        case 'SET_FETCHING': return {...state, fetching: value};
        case 'SET_WEBSITE': return {...state, website: value};
        case 'SET_CURRENT_ITEM': return {...state, currentItem: value};

        case 'ADD_ITEM': newArray = addObject(state.items, value); return {...state, items: newArray};
        case 'UPDATE_ITEM': newArray = replaceObject(state.items, value); return {...state, items: newArray};
        case 'REORDER_ITEM': newArray = replaceObject(state.items, value, true); return {...state, items: newArray};
        case 'REMOVE_ITEM': newArray = removeObject(state.items, value); return {...state, items: newArray};
        case 'UPDATE_URL': 
                let itemArray = updateURL(state.items, state.currentItem, state.website, value); 
                let orderArray = updateURL(state.orderList, state.currentItem, state.website, value); 
                return {...state, items: itemArray, orderList: orderArray};
        case 'IMPORT_ITEMS': return {...state, items: value};
        case 'INSERT_ITEM': newArray = insertObject(state.items, value); return {...state, items: newArray};

        case 'ADD_CATEGORY': newArray = addObject(state.categories, value); return {...state, categories: newArray};
        case 'UPDATE_CATEGORY': newArray = replaceObject(state.categories, value); return {...state, categories: newArray};
        case 'REORDER_CATEGORY': newArray = replaceObject(state.categories, value, true); return {...state, categories: newArray};
        case 'REMOVE_CATEGORY': newArray = removeObject(state.categories, value); return {...state, categories: newArray};
        case 'IMPORT_CATEGORIES': return {...state, categories: value};

        case 'ADD_WEBSITE': newArray = addObject(state.websites, value); return {...state, websites: newArray};
        case 'UPDATE_WEBSITE': newArray = replaceObject(state.websites, value); return {...state, websites: newArray};
        case 'REMOVE_WEBSITE': newArray = removeObject(state.websites, value); return {...state, websites: newArray};
        case 'IMPORT_WEBSITES': return {...state, websites: value};

        case 'SET_ORDER_LIST': return {...state, orderList: value};
        case 'UPDATE_ORDER_LIST': newArray = replaceObject(state.orderList, value); return {...state, orderList: newArray};
        case 'INSERT_ORDER_ITEM': newArray = insertObject(state.orderList, value); return {...state, orderList: newArray};

        case 'SYNC': return {...state, ...value, lastSync: dateValue};
        default: return state;
    }
}

const insertObject = (arr, item) => {
    if (item.id === undefined) item.id = format(new Date(),'T');
    let copy = [...arr];
    let index = copy.findIndex(obj => obj.order === item.order-1 && obj.category === item.category);
    copy.filter(obj => obj.category === item.category && obj.order >= item.order).forEach(obj => obj.order++);
    copy.splice(index+1, 0, item);
    return copy;
}

const removeObject = (arr, id) => {
    return arr.map(obj => {
        if (obj.id === id) {
            let date = Number(format(new Date(),'yyyyMMddHHmmss'));
            return {id: obj.id, deleted: date};
        } else return obj;
    });
}

const replaceObject = (arr, object, order=false) => {
    let copy = [...arr];
    let index = copy.findIndex(obj => obj.id === object.id);
    if (index === -1) return arr;
    object.updated = Number(format(new Date(),'yyyyMMddHHmmss'));
    copy.splice(index,1,object);
    if (order) copy.sort((a,b) => a.order - b.order);
    return copy;
}

const updateURL = (arr, itemId, websiteId, url) => {
    let item = arr.find(item => item.id === itemId);
    if (item !== undefined) {
        let details = item.details;
        if (details[websiteId] !== undefined) details[websiteId].url = url;
        else details[websiteId] = {size: '', note: '', url: url};
        return replaceObject(arr, item);
    }
    return arr;
}

const addObject = (arr, object) => {
    object.id = format(new Date(),'T');
    return [...arr, object];
}