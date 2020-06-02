import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Login from './login/login';
import MovieData from './movieData/movieData';
import {Router,Route,browserHistory} from 'react-router';


ReactDOM.render(<Router history={browserHistory}>
            <Route path ="/" component={App}/>
            <Route path ="/login" component={Login}/>
            <Route path ="/movieRecords" component={MovieData}/>
 </Router>,document.getElementById('root')
);

serviceWorker.unregister();
