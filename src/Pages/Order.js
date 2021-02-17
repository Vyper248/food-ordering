import React from 'react';

const { ipcRenderer } = window.require('electron');

const Order = () => {
    const loadUrl = (url) => () => {
		ipcRenderer.invoke('send-url', url);
	}

    return (
        <div>
            <div onClick={loadUrl('https://groceries.asda.com/product/chocolate-sweet-spreads/lotus-biscoff-smooth-biscuit-spread/910001370718')}>Biscoff</div>
            <div onClick={loadUrl('https://groceries.asda.com/product/nut-butters/whole-earth-smooth-peanut-butter/1000200347701')}>Peanut Butter</div>
            <div onClick={loadUrl('https://groceries.asda.com/product/fresh-filled-pasta/asda-garlic-herb-tortelloni/910000278537')}>Tortellini</div>
            <div onClick={loadUrl('https://groceries.asda.com/product/mini-bites-muffins/asda-bakers-selection-24-mini-flapjack-bites/1000056262453')}>Flapjack</div>
        </div>
    );
}

export default Order;