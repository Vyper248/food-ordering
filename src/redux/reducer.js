import { format } from 'date-fns';

const initialState = {
    page: 'Home',
    website: 1,
    user: null,
    message: {
        text: '',
        type: ''
    },
    lastSync: 0,
    fetching: false,
    orderList: [
        {
            name: 'Weetabix',
            id: 1,
            order: 1,
            category: 1,
            qty: 2,
            size: '48PK',
            note: '',
            url: 'https://groceries.asda.com/product/wheat-biscuits-mini-wheats/asda-wheat-bisks/21056'
        },
        {
            name: 'Cornflakes',
            id: 2,
            order: 2,
            category: 1,
            qty: 1,
            size: '',
            note: '',
            url: 'https://groceries.asda.com/product/cornflakes-crunchy-nut/kelloggs-corn-flakes-cereal/1000121939238'
        },
        {
            name: 'Tortellini',
            id: undefined,
            order: 3,
            category: 1,
            qty: 4,
            size: '250g',
            note: '',
            url: ''
        }
    ],
    items: [
        {
            id: 1,
            order: 1,
            name: 'Weetabix',
            category: 1,
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
            id: 2,
            order: 2,
            name: 'Cornflakes',
            category: 1,
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
        }
    ],
    categories: [
        {
            id: 1,
            name: 'Cereals',
            column: 1,
            page: 1,
            rowsAfter: 1,
            order: 1,
        },
        {
            id: 2,
            name: 'Tinned/Cans',
            column: 1,
            page: 1,
            rowsAfter: 1,
            order: 2,
        },
        {
            id: 3,
            name: 'Dry Goods',
            column: 2,
            page: 1,
            rowsAfter: 1,
            order: 3,
        },
    ],
    websites: [
        {
            id: 1,
            name: 'ASDA',
            searchURL: 'https://groceries.asda.com/search/',
            forceDownload: true
        },
        {
            id: 2,
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

        case 'ADD_ITEM': newArray = addObject(state.items, value); return {...state, items: newArray};
        case 'UPDATE_ITEM': newArray = replaceObject(state.items, value); return {...state, items: newArray};
        case 'REORDER_ITEM': newArray = replaceObject(state.items, value, true); return {...state, items: newArray};
        case 'REMOVE_ITEM': newArray = removeObject(state.items, value); return {...state, items: newArray};

        case 'ADD_CATEGORY': newArray = addObject(state.categories, value); return {...state, categories: newArray};
        case 'UPDATE_CATEGORY': newArray = replaceObject(state.categories, value); return {...state, categories: newArray};
        case 'REORDER_CATEGORY': newArray = replaceObject(state.categories, value, true); return {...state, categories: newArray};
        case 'REMOVE_CATEGORY': newArray = removeObject(state.categories, value); return {...state, categories: newArray};

        case 'ADD_WEBSITE': newArray = addObject(state.websites, value); return {...state, websites: newArray};
        case 'UPDATE_WEBSITE': newArray = replaceObject(state.websites, value); return {...state, websites: newArray};
        case 'REMOVE_WEBSITE': newArray = removeObject(state.websites, value); return {...state, websites: newArray};

        case 'SYNC': return {...state, ...value, lastSync: dateValue};
        default: return state;
    }
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

const addObject = (arr, object) => {
    object.id = Number(format(new Date(),'yyyyMMddHHmmss'));    
    return [...arr, object];
}