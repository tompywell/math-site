import React from 'react';
import { ButtonDropdown, Container, Col, Row, DropdownToggle, DropdownMenu, DropdownItem, Button, ButtonGroup } from 'reactstrap';
import './App.css';
import PDFViewer from './components/PDFViewer';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      examDropdownIsOpen: false,
      yearDropdownIsOpen: false,
      paperDropdownIsOpen: false,
      selectedYear: 2019,
      selectedPaper: 1,
      selectedExam: "jc",
      paperURL: "/documents/papers/jc/2019/1.pdf",
      solutionURL: "/documents/solutions/jc/2019/1.pdf",
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
          this.state.selectedYear + '/' + this.state.selectedPaper + '.pdf'
      });
    };
  }

  render(){
    const { paperURL, solutionURL } = this.state;
    return (
      <div className="App">
        <ButtonGroup>
          <Button onClick={() => this.selectExam('jc')} active={this.state.selectedExam === "jc"}>
            Junior Cert
          </Button>
          <Button onClick={() => this.selectExam('lc')} active={this.state.selectedExam === "lc"}>
            Leaving Cert
          </Button>
          <ButtonDropdown isOpen={this.state.yearDropdownIsOpen} toggle={this.toggleYearDropdown}>
            <DropdownToggle caret>{this.state.selectedYear}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => this.selectYear(2019)}>2019</DropdownItem>
              <DropdownItem onClick={() => this.selectYear(2018)}>2018</DropdownItem>
              <DropdownItem onClick={() => this.selectYear(2017)}>2017</DropdownItem>
              <DropdownItem onClick={() => this.selectYear(2016)}>2016</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <Button onClick={() => this.selectPaper(1)} active={this.state.selectedPaper === 1}>Paper 1</Button>
          <Button onClick={() => this.selectPaper(2)} active={this.state.selectedPaper === 2}>Paper 2</Button>
          <Button color="success" onClick={this.setURLs}>Load</Button>
        </ButtonGroup>

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