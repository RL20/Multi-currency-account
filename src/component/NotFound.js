import React from "react";

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goBack = () => {
    this.props.page();
  };
  render() {
    console.log("prppp", this.props);
    return (
      <div>
        <h3>Not Found</h3>
        <button onClick={this.goBack}> Go Back</button>
      </div>
    );
  }
}

export default NotFound;
