import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { Document, Page, pdfjs } from 'react-pdf';

import "./PDFViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default class PDFViewer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      numPages: null,
      pageNumber: 1,
    };

    this.onLoad = (document) => {
      const { numPages } = document;
      this.setState({
        numPages: numPages,
        pageNumber: 1
      });
    };

    this.previousPage = () => (
      this.setState(
        prevState => ({pageNumber: prevState.pageNumber - 1})
      )
    );
  
    this.nextPage = () => (
      this.setState(
        prevState => ({pageNumber: prevState.pageNumber + 1})
      )
    );
  }

  render(){
    const {pageNumber, numPages} = this.state;
    return (
      <div className="PDFViewer">
        <Document file={this.props.url} onLoadSuccess ={this.onLoad}>
          <Page pageNumber={pageNumber}/>
        </Document>
        <ButtonGroup>
          <Button disabled={pageNumber<=1} onClick={this.previousPage}>
            Previous
          </Button>
          <Button disabled>Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}</Button>
          <Button disabled={pageNumber>= numPages} onClick={this.nextPage}>
            Next
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
