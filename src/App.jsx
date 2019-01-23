import React from "react";
import {connect} from "react-redux";

class App extends React.Component{

	componentDidMount() {
		console.log(this.props);
		this.props.onClick();
		console.log(this.props.state, 111);
		this.props.onClick2();
		console.log(this.props.state, 111);

	}
	render() {
		return (
			<div>342</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		state: state
	};
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch({type: "add1"});
		},
		onClick2: () => {
			dispatch({type: "add2"});
		}
	};
  };

export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(App);

