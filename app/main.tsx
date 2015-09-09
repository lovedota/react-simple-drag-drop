import 'babel-core/polyfill';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';

import React  from 'react';
import DashboardActions from './actions/dashboard-actions';
import DashboardPage from './components/dashboard/dashboard-page';

DashboardActions.getProducts();
React.render(<DashboardPage />, document.getElementById('app-content'));
