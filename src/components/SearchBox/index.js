import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { SearchInput } from 'components/Shared/Reports/styles';

class SearchBox extends Component {

  handleChange = e => {
    const {onChange} = this.props;
    const query = e.target.value;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      onChange(query);
    }, 1000);
  };

  render() {
    return (
      <SearchInput
        onChange={this.handleChange}
        icon="search"
        iconPosition="left"
        placeholder="Search ..."
      />
    );
  }
}

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SearchBox;