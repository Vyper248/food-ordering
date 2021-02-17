import { format } from 'date-fns';

const initialState = {
    page: 'Home',
    website: '',
    user: null,
    message: {
        text: '',
        type: ''
    },
    lastSync: 0,
    fetching: false,
    items: [],
    categories: [],
    websites: [
        {
            name: 'ASDA',
            searchURL: 'https://groceries.asda.com/search/',
            forceDownload: true
        },
        {
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
        case 'REMOVE_ITEM': newArray = removeObject(state.items, value); return {...state, items: newArray};

        case 'ADD_CATEGORY': newArray = addObject(state.categories, value); return {...state, categories: newArray};
        case 'UPDATE_CATEGORY': newArray = replaceObject(state.categories, value); return {...state, categories: newArray};
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

const replaceObject = (arr, object) => {
    let copy = [...arr];
    let index = copy.findIndex(obj => obj.id === object.id);
    if (index === -1) return arr;
    object.updated = Number(format(new Date(),'yyyyMMddHHmmss'));
    copy.splice(index,1,object);
    return copy;
}

const addObject = (arr, object) => {
    object.id = Number(format(new Date(),'yyyyMMddHHmmss'));    
    return [...arr, object];
}