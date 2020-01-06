/* eslint-disable no-useless-constructor */
import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<>
            <div className = "container mx-auto text-center">
                <h1>Welcome to the Food Delivery App.</h1>
            </div>
        </>);
    }
}

export default Home;