import './App.css';
import { useSelector } from 'react-redux';

import MenuBar from './Components/MenuBar';
import Container from './Components/Container';

import Home from './Pages/Home';
import Settings from './Pages/Settings';
import NewOrder from './Pages/NewOrder';
import Order from './Pages/Order';
import Import from './Pages/Import';
import Template from './Pages/Template';

const { ipcRenderer } = window.require('electron');

function App() {
	const page = useSelector(state => state.page);

	page === 'Order' ? ipcRenderer.invoke('start-order') : ipcRenderer.invoke('end-order');

	return (
		<div className="App" style={{paddingBottom: '50px'}}>
			<MenuBar/>
			<div style={{height: '32px'}}></div>
			<Container>
				{ page === 'Home' ? <Home/> : null }
				{ page === 'Settings' ? <Settings/> : null }
				{ page === 'Import' ? <Import/> : null }
			</Container>
			{ page === 'New Order' ? <NewOrder/> : null }
			{ page === 'Order' ? <Order/> : null }
			{ page === 'Template' ? <Template/> : null }
		</div>
	);
}

export default App;
