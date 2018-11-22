import React from 'react';
import { FormFieldStyles, TextError, SelectStyles, FormGroup, LabelStyles } from '../../styles/App';

const styles = {
  control: styles => ({
    ...styles,
    border: '1px solid rgba(34,36,38,.15)',
    '&:focus': { border: '1px solid #85b7d9' },
    fontSize: '14px'
  })
};

const errorStyles = {
  control: styles => ({
    ...styles,
    '&:focus': { border: '1px solid #85b7d9' },
    backgroundColor: '#fff6f6',
    borderColor: '#e0b4b4',
    fontSize: '14px'
  })
};

class SelectInput extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values[name]. eg. values.members, values.teamLeader...
    const { name, onChange } = this.props;
    onChange(name, value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched[name]. eg. touched.members, touched.teamLeader...
    const { name, onBlur } = this.props;
    onBlur(name, true);
  };

  render() {
    const { options, value, error, isMulti, name, placeholder } = this.props;

    return (
      <FormGroup>
        <FormFieldStyles>
          <LabelStyles error={error}>{name}</LabelStyles>
          <SelectStyles
            placeholder={placeholder}
            options={options}
            isMulti={!!isMulti}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={value}
            styles={error ? errorStyles : styles}
          />
          {!!error && <TextError> {error}</TextError>}
        </FormFieldStyles>
      </FormGroup>
    );
  }
}

export default SelectInput;
