import React, { Component, Fragment } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { IconBtn } from '../../styles/ContentsTable';

class ModalConfirm extends Component {
  state = {
    open: false
  };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  handleDelete = (deleteMutation, id) => {
    deleteMutation({ variables: { id } });
  };

  no = () => {
    this.setState({ open: false });
  };

  yes = (deleteMutation, id) => {
    this.setState({ open: false });
    this.handleDelete(deleteMutation, id);
  };

  render() {
    const { deleteMutation, id } = this.props;
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
            <Button size="mini" onClick={this.no} negative>
              No
            </Button>
            <Button
              size="mini"
              onClick={() => this.yes(deleteMutation, id)}
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

export default ModalConfirm;
