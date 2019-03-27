import React, { Component } from 'react';
import cluster from 'set-clustering';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';

import Matrix from './Matrix';
import Clusters from './Clusters';
import Footer from './Footer';
import { getLetter, similarity } from './utils'

// Styles
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: null,
      parts: null,
      matrix: [],
      clusters: [],
    };
  }

  getClusters = () => {
    const { machines } = this.state;
    const groups = cluster(this.convertMatrix(), similarity);
    let clusters = [];
    for (let i = 0; i < machines; i++) {
      clusters.push(groups.evenGroups(machines - i));
    }
    this.setState({ clusters });
  };

  convertMatrix = () => {
    const { matrix } = this.state;
    let adaptedMatrix = [];
    matrix.forEach(machine => {
      adaptedMatrix.push({
        machine: machine.machine,
        parts: this.getParts(machine.parts),
      });
    });
    return adaptedMatrix;
  };

  getParts = binaryArray => {
    let partsArray = [];
    binaryArray.forEach((part, index) => {
      if (!!part) {
        partsArray.push(`${index + 1}`);
      }
    });
    return partsArray;
  };

  handleMachinePart = async (machine, part, value) => {
    await this.setState(prevState => {
      const { matrix } = prevState;
      matrix[machine].parts[part] = value ? 1 : 0;
      return { ...prevState, matrix };
    });
  };

  cleanMatrix = () => {
    const { machines, parts } = this.state;
    const matrix = new Array(machines || 1);
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = {
        machine: getLetter(i),
        parts: new Array(parts || 1).fill(0),
      }
    }
    this.setState({ matrix });
  };

  handleOnChange = async (event, key) => {
    const { value } = event.target;
    await this.setState({[key]: parseInt(value)});
    this.cleanMatrix();
  };

  cleanTable = () => {
    this.cleanMatrix();
    this.setState({ clusters: [] });
  };

  render() {
    const { machines, parts, matrix, clusters } = this.state;
    const showMatrix = !!machines || !!parts;
    return (
      <div className="app">
        <header
          className={classNames('app-header', {
            ['table-shown']: showMatrix, 
          })}
        >
          <div className="cluster-header">
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
          </div>
        </header>
        {showMatrix && (
          <React.Fragment>
            <Matrix
              matrix={matrix}
              onChangeMachinePart={this.handleMachinePart}
              getClusters={this.getClusters}
              cleanTable={this.cleanTable}
            />
            <Clusters clusters={clusters} />
          </React.Fragment>
        )}
        <Footer />
      </div>
    );
  };
}

export default App;
