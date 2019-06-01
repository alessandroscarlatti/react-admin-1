var Button = Reactstrap.Button;
var Modal = Reactstrap.Modal;
var ModalHeader = Reactstrap.ModalHeader;
var ModalBody = Reactstrap.ModalBody;
var ModalFooter = Reactstrap.ModalFooter;
var ListGroup = Reactstrap.ListGroup;
var ListGroupItem = Reactstrap.ListGroupItem;
var Container = Reactstrap.Container;
var Col = Reactstrap.Col;
var Row = Reactstrap.Row;
var Form = Reactstrap.Form;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;

class WebSocketApp {
    set server(server) {
        this._server = server;
    }

    get server() {
        return this._server;
    }

    /**
     * These are the front end application functions.
     */
}

class Example extends React.Component {
  render() {  
    return (
      <div>
        <Button color="primary">primary</Button>{' '}
        <Button color="secondary">secondary</Button>{' '}
        <Button color="success">success</Button>{' '}
        <Button color="info">info</Button>{' '}
        <Button color="warning">warning</Button>{' '}
        <Button color="danger">danger</Button>{' '}
        <Button color="link">link</Button>
      </div>
    );
  }
}

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} autoFocus={false}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

class ListExample extends React.Component {
	
  render() {
    return (
		<Row noGutters={true} className="flex-nowrap">
			<Col xs="1">
			  <ListGroup>
				<ListGroupItem><i className="material-icons">logout</i></ListGroupItem>
				<ListGroupItem><i className="material-icons">enter</i></ListGroupItem>
				<ListGroupItem><i className="material-icons">person</i></ListGroupItem>
				<ListGroupItem><i className="material-icons">person</i></ListGroupItem>
				<ListGroupItem><i className="material-icons">person</i></ListGroupItem>
			  </ListGroup>
		  </Col>
		  <Col xs="11">
        <ListView />
		  </Col>
		</Row>
    );
  }
}

class ListView extends React.Component {

  constructor(props) {
    super(props);

    this.data = [
      {
        email: "qwer@stuff.com",
        password: "stuff",
        id: 0,
        state: "VIEW",
        enabled: true,
      },
      {
        email: "asdf@stuff.com",
        password: "stuff",
        id: 1,
        state: "VIEW",
        enabled: true,
      },
      {
        email: "asdf@stuff.com",
        password: "stuff",
        id: 2,
        state: "VIEW",
        enabled: true,
      },
      {
        email: "",
        password: "",
        id: 3,
        state: "NEW",
        enabled: true,
      },
    ]

    this.state = {
      data: this.data,
    }

    this.dataReducer = this.dataReducer.bind(this);
    this.doEditStart = this.doEditStart.bind(this);
    this.doEditCancel = this.doEditCancel.bind(this);
    this.doEditSave = this.doEditSave.bind(this);
    this.doCreate = this.doCreate.bind(this);
    this.doDelete = this.doDelete.bind(this);
    this.nextId = this.nextId.bind(this);

    this.counterId = 0;
  }

  nextId() {
    this.counterId++;
    return "id" + this.counterId;
  }

  dataReducer(action) {
    switch (action.type) {
      case "EDIT_START":
        this.doEditStart(action.data)
      case "CREATE":
        this.doCreate(action.data);
      case "EDIT_CANCEL":
        this.doEditCancel(action.data);
      case "EDIT_SAVE":
        this.doEditSave(action.data);
      default:
        return this.data;
    }
  }

  doEditStart(itemEdit) {
    // find the item being edited and update its state
    // and disable the others
    let newData = this.state.data;

    this.state.data.forEach(item => {
      if (item.id === itemEdit.id) {
        item.state = "EDIT";
        item.enabled = true;
      } else {
        item.enabled = false;
      }
    })

    this.setState({
      data: newData,
    })
  }

  doEditCancel(itemEdit) {
    // find the item being edited and update its state
    // and enable the others
    let newData = this.state.data;

    this.state.data.forEach(item => {
      if (item.id === itemEdit.id) {
        item.state = "VIEW";
        item.enabled = true;
      } else {
        item.enabled = true;
      }
    })

    this.setState({
      data: newData,
    })
  }

  doEditSave(itemEdit) {
    // find the item being edited and update its state
    // and enable the others
    let newData = this.state.data;

    this.state.data.forEach(item => {
      if (item.id === itemEdit.id) {
        item.state = "VIEW";
        item.enabled = true;
        item.email = itemEdit.email;
        item.password = itemEdit.password;
      } else {
        item.enabled = true;
      }
    })

    this.setState({
      data: newData,
    })
  }

  doCreate(itemCreate) {
    // add the item being created and update the state of all the items.
    // and enable the others
    let newData = this.state.data;

    this.state.data.forEach(item => {
      if (item.id === itemCreate.id) {
        item.state = "VIEW";
        item.enabled = true;
        item.email = itemCreate.email;
        item.password = itemCreate.password;
      } else {
        item.enabled = true;
      }
    })

    // now add another empty "new item"
    newData.push({
      email: "",
      password: "",
      id: this.nextId(),
      state: "NEW",
      enabled: true,
    });

    this.setState({
      data: newData,
    })
  }

  doDelete(itemDelete) {
    // remove the item being created and update the state of all the items.
    let newData = [];

    this.state.data.forEach(item => {
      if (item.id !== itemDelete.id) {
        newData.push(item);
        item.enabled = true;
      }
    })

    this.setState({
      data: newData,
    })
  }

  itemFactory(data) {
    switch (data.state) {
      case "VIEW":
        return (<ExistingItem data={data} editStart={this.doEditStart} delete={this.doDelete} />)
      case "EDIT":
        return (<EditingItem data={data} editCancel={this.doEditCancel} editSave={this.doEditSave} />)
      case "NEW":
        return (<NewItem data={data} create={this.doCreate} />)
    }
  }

  render() {
    // build items from the data
    let items = [];
    
    this.state.data.forEach(item => {
      let compItem = this.itemFactory(item);
      items.push(compItem);
    })

    return (
      <Container fluid>
        {items}
      </Container>
    )
  }
}

class ConfirmModal extends React.Component {

  constructor(props) {
    super(props);
    // expect { onConfirm, onCancel }
  }

  render() {
	 return (
		<Modal isOpen={this.props.show} toggle={this.toggle} className={this.props.className}>
      <ModalHeader toggle={this.toggle}>Confirm Action</ModalHeader>
      <ModalBody>
        Are you sure you want to do this?
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.props.confirm}>Yes, Go Ahead</Button>{' '}
        <Button color="secondary" onClick={this.props.cancel}>No, Stop!</Button>
      </ModalFooter>
    </Modal>
	 )
  }
}

class ExistingItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
    }

    this.delete = this.delete.bind(this);
    this.confirmedDelete = this.confirmedDelete.bind(this);
    this.canceledDelete = this.canceledDelete.bind(this);
    this.editStart = this.editStart.bind(this);
  }

  delete(e) {
    e.preventDefault();
    this.setState({
      confirmDelete: true
    })
  }

  confirmedDelete() {
    // do delete here.
    this.setState({
      confirmDelete: false
    })
    this.props.delete(this.props.data);
  }

  canceledDelete() {
    // no delete.
    this.setState({
      confirmDelete: false
    })
  }

  editStart(e) {
    e.preventDefault();
    this.props.editStart(this.props.data);
  }

  render() {

    let disabled = (this.props.data.enabled === false);

    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="provide your email" value={this.props.data.email} disabled />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="make up a good password" value={this.props.data.password} disabled />
        </FormGroup>
        <FormGroup>
          <Button color="secondary" onClick={this.editStart} disabled={disabled}>Edit</Button>
          {' '}
          <Button color="danger" onClick={this.delete} disabled={disabled}>Delete</Button>
        </FormGroup>
        <ConfirmModal show={this.state.confirmDelete} confirm={this.confirmedDelete} cancel={this.canceledDelete} />
	    </Form>
    );
  }
}

class NewItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }

    this.create = this.create.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }


  create(e) {
    e.preventDefault();
    let newData = this.props.data;
    newData.email = this.state.email;
    newData.password = this.state.password;
    this.props.create(newData);
  }

  updateEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    let disabled = this.props.data.enabled === false;

    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="provide your email" value={this.state.email} onChange={this.updateEmail} disabled={disabled} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="make up a good password" value={this.state.password} onChange={this.updatePassword} disabled={disabled} />
        </FormGroup>
		<FormGroup>
		<Button color="primary" disabled={disabled} onClick={this.create}>Create</Button>
		</FormGroup>
	  </Form>
    );
  }
}

class EditingItem extends React.Component {

  constructor(props) {
    super(props);

    this.editCancel = this.editCancel.bind(this);
    this.editSave = this.editSave.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);

    this.state = {
      email: props.data.email,
      password: props.data.password,
    }
  }

  editCancel(e) {
    e.preventDefault();
    this.props.editCancel(this.props.data);
  }

  editSave(e) {
    e.preventDefault();
    let newData = this.props.data;
    newData.email = this.state.email;
    newData.password = this.state.password;
    this.props.editSave(newData);
  }

  updateEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="provide your email" value={this.state.email} onChange={this.updateEmail}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="make up a good password" value={this.state.password} onChange={this.updatePassword} />
        </FormGroup>
        <FormGroup>
          <Button color="primary" onClick={this.editSave}>Save</Button>
          {' '}
          <Button color="secondary" onClick={this.editCancel}>Cancel</Button>
        </FormGroup>
	  </Form>
    );
  }
}


class App extends React.Component {
    render() {
        return (
            <Container fluid className="p-0 m-0">
				<ListExample />
			</Container>
        );
    }
}

