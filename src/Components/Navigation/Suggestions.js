import React, { Component } from 'react';
import {connect} from 'react-redux'
/************************ Import CSS ***********************/
import './SearchResults.css';
import {ListGroup} from "react-bootstrap";
import {returnFilters} from "../../actions/filters_action";
import PropTypes from "prop-types";


function removeDuplicates(arr, equals) {
  var originalArr = arr.slice(0);
  var i, len, val;
  arr.length = 0;

  for (i = 0, len = originalArr.length; i < len; ++i) {
    val = originalArr[i];
    if (!arr.some(function(item) { return equals(item, val); })) {
      arr.push(val);
    }
  }
}
function thingsEqual(thing1, thing2) {
  return thing1.classField === thing2.classField
}


class Suggestions extends Component {

  static propTypes = {
    returnFilters: PropTypes.func.isRequired
  }

  render() {
    let result_array = []
    for (let i = 0; i < this.props.results.length; i++) {
      result_array.push({
        id: i,
        classField: this.props.results[i].classField
      })
    }
    removeDuplicates(result_array, thingsEqual)

    //Pass the values to redux
    this.props.returnFilters(result_array)

    const options = result_array.map(r => (
      <ListGroup key={r.id}>
        <ListGroup.Item key={r.id}>
          {r.classField}
        </ListGroup.Item>
      </ListGroup>

    ))
    return <ul>{options}</ul>

  }
}
const mapStateToProps = state => ({
  // returnFilters: state.filter.filters
})
export default connect(mapStateToProps, { returnFilters })(Suggestions);

