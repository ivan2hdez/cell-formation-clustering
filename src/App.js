import React, { Component } from 'react';
import cluster from 'set-clustering';
import NumberFormat from 'react-number-format';
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';

import Matrix from './Matrix/Matrix';

// Styles
import './App.css';

const charCode = 'a'.charCodeAt(0);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: null,
      parts: null,
      matrix: [],
    };
  }

  getLetter = index => {
    const b = [index];
    let sp = 0;
    let out = '';
    let div;

    while(sp < b.length) {
      if (b[sp] > 25) {
        div = Math.floor(b[sp] / 26);
        b[sp + 1] = div - 1;
        b[sp] %= 26;
      }
      sp++;
    }

    for (let i = 0; i < b.length; i++) {
      out = String.fromCharCode(charCode + b[i]) + out;
    }

    return out.toUpperCase();
  };

  // Base similarity on number of common tags.
  similarity = (x, y) => {
    let score = 0;
    x.parts.forEach((tx) => {
      y.parts.forEach((ty) => {
        if (tx === ty)
          score++;
      });
    });
    return score;
  }

  getClusters = () => {
    const { matrix } = this.state;
    const clusters = cluster(matrix, this.similarity);
    const groups = clusters.evenGroups(2);
    console.log(groups);
  };

  handleMachinePart = async (machine, part, value) => {
    await this.setState(prevState => {
      const { matrix } = prevState;
      matrix[machine].parts[part] = value ? 1 : 0;
      return { ...prevState, matrix };
    });
  };

  handleOnChange = async (event, key) => {
    const { value } = event.target;
    await this.setState({[key]: parseInt(value)});

    const { machines, parts } = this.state;
    const matrix = new Array(machines || 1);
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = {
        machine: this.getLetter(i),
        parts: new Array(parts || 1).fill(0),
      }
    }
    this.setState({ matrix });
  };


  render() {
    const { machines, parts, matrix } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Clustering using Similarity Coefficients</h1>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="machinesQuantity"># of machines</Label>
                <NumberFormat
                  customInput={Input}
                  name="machines"
                  value={machines}
                  onChange={event => {
                    this.handleOnChange(event, 'machines');
                  }}
                  id="machinesQuantity"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="partsQuantity"># of parts</Label>
                <NumberFormat
                  customInput={Input}
                  name="parts"
                  value={parts}
                  onChange={event => {
                    this.handleOnChange(event, 'parts');
                  }}
                  id="partsQuantity"
                />
              </FormGroup>
            </Col>
          </Row>
        </header>
        <Matrix
          matrix={matrix}
          onChangeMachinePart={this.handleMachinePart}
          getClusters={this.getClusters}
        />
        <div>Icons made by
          <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">
            {' '}Eucalyp{' '}
          </a>
          from
          <a href="https://www.flaticon.com/" title="Flaticon">
          {' '}www.flaticon.com{' '}
          </a>
        </div>
      </div>
    );
  };
}

export default App;
