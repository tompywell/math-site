import React from 'react';
import { ButtonDropdown, Container, Col, Row, DropdownToggle, DropdownMenu, DropdownItem, Button, ButtonGroup, Collapse,
  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown } from 'reactstrap';
import './App.css';
import PDFViewer from './components/PDFViewer';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      examDropdownIsOpen: false,
      yearDropdownIsOpen: false,
      paperDropdownIsOpen: false,
      selectedYear: 2021,
      selectedPaper: 1,
      selectedExam: "lc",
      paperURL: "/documents/papers/lc/2021/1.pdf",
      solutionURL: "/documents/solutions/lc/2021/1.pdf",
    };

    this.toggleExamDropdown = () => {
      this.setState({
        examDropdownIsOpen: !this.state.examDropdownIsOpen
      });
    };

    this.toggleYearDropdown = () => {
      this.setState({
        yearDropdownIsOpen: !this.state.yearDropdownIsOpen
      });
    };
  
    this.togglePaperDropdown = () => {
      this.setState({
        paperDropdownIsOpen: !this.state.paperDropdownIsOpen
      });
    };
  
    this.selectYear = (year) => {
      this.setState({
        selectedYear: year
      });
    };
  
    this.selectPaper = (paper) => {
      this.setState({
        selectedPaper: paper
      });
    };
  
    this.selectExam = (exam) => {
      this.setState({
        selectedExam: exam
      });
    };
  
    this.setURLs = () => {
      this.setState({
        paperURL:
          '/documents/papers/' + this.state.selectedExam + '/' +
          this.state.selectedYear + '/' + this.state.selectedPaper + '.pdf',
        solutionURL:
          '/documents/solutions/' + this.state.selectedExam + '/' +
          this.state.selectedYear + '/' + 1 + '.pdf'
      });
    };
  }

  render(){
    const { paperURL, solutionURL } = this.state;
    const years = []
    for (var i=2021; i>=2010; i--){
      years.push(i)
    }
    const yearDropdownItems = years.map((y) => (<DropdownItem onClick={() => this.selectYear(y)} key={y}>{y}</DropdownItem>))
    return (
      <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">math-site</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <ButtonGroup>
                  <Button outline onClick={() => this.selectExam('jc')} active={this.state.selectedExam === "jc"}>
                    Junior Cert
                  </Button>
                  <Button outline onClick={() => this.selectExam('lc')} active={this.state.selectedExam === "lc"}>
                    Leaving Cert
                  </Button>
                </ButtonGroup>
              </NavItem>
              <NavItem>
                <ButtonDropdown isOpen={this.state.yearDropdownIsOpen} toggle={this.toggleYearDropdown}>
                  <DropdownToggle outline caret>{this.state.selectedYear}</DropdownToggle>
                  <DropdownMenu>
                    {yearDropdownItems}
                  </DropdownMenu>
                </ButtonDropdown>
              </NavItem>
              <NavItem>
                <ButtonGroup>
                  <Button outline onClick={() => this.selectPaper(1)} active={this.state.selectedPaper === 1}>Paper 1</Button>
                  <Button outline onClick={() => this.selectPaper(2)} active={this.state.selectedPaper === 2}>Paper 2</Button>
                </ButtonGroup>
              </NavItem>
              <NavItem>
                <ButtonGroup>
                  <Button outline color="success" onClick={this.setURLs}>Load</Button>
                </ButtonGroup>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="https://www.tompywell.me">
                    tompywell.me
                  </DropdownItem>
                  <DropdownItem href="https://www.github.com/tompywell/math-site">
                    GitHub
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem >
                    <strike>Logout</strike>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

        <Container>
          <Row>
            <Col className="paper">
              <PDFViewer url={paperURL}/>
            </Col>
            <Col className="solution">
              <PDFViewer url={solutionURL}/>
            </Col>
          </Row >
        </Container>
      </div>
    );
  };
};