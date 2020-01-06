/* eslint-disable no-useless-constructor */
import React from 'react';
import {Link} from 'react-router-dom';

class RestaurantCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className = "card col-5 p-0 m-1">
                    <div className = "card-header text-center">
                        <h5>{this.props.obj.name}</h5>
                    </div>
                    <div className = "card-body">
                        <h6 className = "text-danger">Rating: {this.props.obj.rate}</h6>
                        <h6>Votes: {this.props.obj.votes}</h6>
                        <h6>Type: {this.props.obj.rest_type}</h6>
                        <h6>Cuisines: {this.props.obj.cuisines}</h6>
                        <h6>Price for two: Rs.{this.props.obj["approx_cost(for two people)"]}</h6>
                        <h6>Address: {this.props.obj.address}</h6>
                    </div>
                    <div className = "card-footer text-center">
                        <Link to = {`/restaurants/${this.props.obj.id}`}><button className = "btn btn-outline-danger">See Menu</button></Link>
                    </div>
                </div>
            </>
        );
    }
}

export default RestaurantCard;