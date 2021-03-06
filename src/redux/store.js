import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducer';

const localStorageMiddleware = ({getState}) => {
    return (next) => (action) => {
        const result = next(action);
        
        const ignore = ['SET_PAGE', 'SET_FETCHING', 'SET_MESSAGE', 'SET_FILTER'];
        if (ignore.includes(action.type)) return result;

        localStorage.setItem('foodOrderingState', JSON.stringify(getState()));

        return result;
    }
};

const getFromLocalStorage = () => {
    let state = localStorage.getItem('foodOrderingState');
    if (state !== null) {
        state = JSON.parse(state);
        state.page = 'Home';
        state.message = {text: '', type: ''};
        state.fetching = false;
        state.filter = '';
        return state;
    }
}

// const store = createStore(reducer, applyMiddleware(localStorageMiddleware));
const store = createStore(reducer, getFromLocalStorage(), applyMiddleware(localStorageMiddleware));

export default store;