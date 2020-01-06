import React from 'react';
import RestaurantCard from './RestaurantCard';
import {fetchData} from '../redux/Action';
import {connect} from 'react-redux';

class RestaurantWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery:'',
            data:[]
        };
    }

    componentDidMount() {
        this.setState({
            data: this.props.restaurantData
        });
    }

    handleChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }

    handleClick = () => {
        let filteredArr = this.props.restaurantData.filter(el => {
            return el.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1;
        });
        if (filteredArr.length === 0) {
            alert("NO DATA FOUND!!!");
        }
        else {
            this.setState({
                data: filteredArr
            });
        }
        this.setState({
            searchQuery:''
        });
    }

    render() {
        return (
            <div className = "container mx-auto mt-5">
                <div className = "row d-flex justify-content-between">
                    <div className = "col-8 ml-5">
                        <input type = "text" placeholder = "Enter Restaurant Name" className = "form-control" value = {this.state.searchQuery} onChange = {this.handleChange}></input>
                    </div>
                    <div className = "col-3">
                        <button className = "btn btn-outline-primary" onClick = {this.handleClick}>Search</button>
                    </div>
                </div>
                <div className = "row d-flex justify-content-between">
                    {this.state.data.map((e,i) => <RestaurantCard obj = {e} key = {Math.random()} />)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    restaurantData: state.restaurantData
});

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(fetchData())
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantWindow);