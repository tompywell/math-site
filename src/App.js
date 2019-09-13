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
      selectedExam: "JC"
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
    console.log('loading', this.state.selectedExam, this.state.selectedYear, "paper", this.state.selectedPaper)
  }

  onDocumentLoadSuccess = ({numPages}) => {
    this.setState({numPages});
  }

  render(){
    return (
      <div className="App">
        <ButtonGroup>
          <Button color="primary" onClick={() => this.selectExam('JC')} active={this.state.selectedExam === "JC"}>Junior Cert</Button>
          <Button color="primary" onClick={() => this.selectExam('LC')} active={this.state.selectedExam === "LC"}>Leaving Cert</Button>
          <ButtonDropdown isOpen={this.state.yearDropdownIsOpen} toggle={this.toggleYearDropdown}>
            <DropdownToggle caret color="warning">{this.state.selectedYear}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => this.selectYear(2019)}>2019</DropdownItem>
              <DropdownItem onClick={() => this.selectYear(2018)}>2018</DropdownItem>
              <DropdownItem onClick={() => this.selectYear(2017)}>2017</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <Button color="success" onClick={() => this.selectPaper(1)} active={this.state.selectedPaper === 1}>Paper 1</Button>
          <Button color="success" onClick={() => this.selectPaper(2)} active={this.state.selectedPaper === 2}>Paper 2</Button>
          <Button color="danger" onClick={this.loadPaper}>Load</Button>
        </ButtonGroup>

        <Container>
          <Row>
            <Col>
              <PDFViewer backend={PDFJSBackend} src='/documents/papers/jc/2019/1.pdf'/>
            </Col>
            <Col>
              <PDFViewer backend={PDFJSBackend} src='/documents/papers/jc/2019/1.pdf'/>
            </Col>
          </Row >
        </Container>

      </div>
    );
  }
}
