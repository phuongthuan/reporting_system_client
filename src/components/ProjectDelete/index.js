import React, { Fragment, Component } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { IconBtn } from '../../styles/ContentsTable';

// This component inmplementation is not finished yet
// TODO : Add Delete Mutation to handle delete project

class ProjectDelete extends Component {
  state = {
    open: false
  };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  no = () => {
    this.setState({ open: false });
  };

  yes = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;

    return (
      <Fragment>
        <IconBtn>
          <Icon
            bordered
            inverted
            color="red"
            name="trash alternate"
            onClick={this.closeConfigShow(false, true)}
          />
        </IconBtn>

        <Modal
          size="mini"
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.no}
        >
          <Modal.Header as="h4">Confirm Delete</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button size="mini" negative onClick={this.no}>
              No
            </Button>
            <Button
              size="mini"
              onClick={this.yes}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

export default ProjectDelete;
