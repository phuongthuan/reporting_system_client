import React from 'react';
import { Form } from 'semantic-ui-react';
import { Emoji } from 'emoji-mart';

class RadioInput extends React.Component {

  handleRadioChange = (e, { value }) => {
    const { onRadioChange } = this.props;
    onRadioChange(value);
  };

  render() {
    const { emotion } = this.props;
    return (
      <Form.Group inline>
        {/*eslint-disable-next-line*/}
        <label htmlFor="Emotion">Emotion</label>

        <Form.Radio
          label={(
            // eslint-disable-next-line
            <label htmlFor=":grinning:">
              <Emoji
                emoji=":grinning:"
                size={24}
              />
            </label>
          )}
          value=':grinning:'
          checked={emotion === ':grinning:'}
          onChange={this.handleRadioChange}
        />

        <Form.Radio
          label={(
            // eslint-disable-next-line
            <label htmlFor=":neutral_face:">
              <Emoji
                emoji=":neutral_face:"
                size={24}
              />
            </label>
          )}
          value=':neutral_face:'
          checked={emotion === ':neutral_face:'}
          onChange={this.handleRadioChange}
        />

        <Form.Radio
          label={(
            // eslint-disable-next-line
            <label htmlFor=":disappointed_relieved:">
              <Emoji
                emoji=":disappointed_relieved:"
                size={24}
              />
            </label>
          )}
          value=':disappointed_relieved:'
          checked={emotion === ':disappointed_relieved:'}
          onChange={this.handleRadioChange}
        />
      </Form.Group>
    )
  }
}

export default RadioInput;