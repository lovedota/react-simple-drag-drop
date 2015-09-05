import './styles/dashboard-basket.scss';

import * as React from 'react';
import classNames from "classnames";
import DashboardActions from '../../actions/dashboard-actions';

interface Props extends React.Props<any> {

}

interface State {

}

class DashboardActionButtonsComponent extends React.Component<Props, State> {
  static displayName = "DashboardActionButtonsComponent";

  constructor(props) {
    super(props);
  }

	render() {
    return (
      <p>
        <button className="btn" onClick={this.handleClick}>Shuffle</button>
      </p>
    );
	}

  private handleClick = (e) => {
    DashboardActions.shuffleProducts();
  }
}

export default DashboardActionButtonsComponent;
