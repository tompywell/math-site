import React from 'react';

import { ButtonDropdown, Container, Col, Row, DropdownToggle, DropdownMenu, DropdownItem, Button, ButtonGroup } from 'reactstrap';

import './App.css';

import PDFViewer from './components/PDFViewer';
import PDFJSBackend from './backends/pdfjs';

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
      paperURL: "/documents/papers/jc/2019/1.pdf"
    }

    this.toggleExamDropdown = this.toggleExamDropdown.bind(this);
    this.toggleYearDropdown = this.toggleYearDropdown.bind(this);
    this.togglePaperDropdown = this.togglePaperDropdown.bind(this);
    this.selectExam = this.selectExam.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.selectPaper = this.selectPaper.bind(this);
    this.loadPaper = this.loadPaper.bind(this);
  }

  toggleExamDropdown(){
    this.setState({
      examDropdownIsOpen: !this.state.examDropdownIsOpen
    })
  }

  toggleYearDropdown(){
    this.setState({
      yearDropdownIsOpen: !this.state.yearDropdownIsOpen
    })
  }

  togglePaperDropdown(){
    this.setState({
      paperDropdownIsOpen: !this.state.paperDropdownIsOpen
    })
  }

  selectYear(year){
    this.setState({
      selectedYear: year
    });
  }

  selectPaper(paper){
    this.setState({
      selectedPaper: paper
    });
  }

  selectExam(exam){
    this.setState({
      selectedExam: exam
    });
  }

  loadPaper(){
    this.setState({
      paperURL: '/documents/papers/' + this.state.selectedExam + '/' + this.state.selectedYear + '/' + this.state.selectedPaper + '.pdf',
      solutionURL: '/documents/solutions/' + this.state.selectedExam + '/' + this.state.selectedYear + '/' + this.state.selectedPaper + '.pdf'
    });
    console.log('loading: ' + '/documents/papers/' + this.state.selectedExam + '/' + this.state.selectedYear + '/' + this.state.selectedPaper + '.pdf');
  }

  render(){
    return (
      <div className="App">
        <ButtonGroup>
          <Button onClick={() => this.selectExam('jc')} active={this.state.selectedExam === "jc"}>Junior Cert</Button>
          <Button onClick={() => this.selectExam('lc')} active={this.state.selectedExam === "lc"}>Leaving Cert</Button>
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
          <Button color="success" onClick={this.loadPaper}>Load</Button>
        </ButtonGroup>

        <Container>
          <Row>
            <Col className="paper">
              <PDFViewer backend={PDFJSBackend} src={this.state.paperURL}/>
            </Col>
            <Col className="solution">
              <PDFViewer backend={PDFJSBackend} src={this.state.solutionURL}/>
            </Col>
          </Row >
        </Container>

      </div>
    );
  }
}
