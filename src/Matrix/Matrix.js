import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, FormGroup, Input, Container, Row, Col } from 'reactstrap';

// Styles
import './Matrix.css';

class Matrix extends Component {
  render() {
    const { matrix } = this.props;
    return !!matrix.length && (
      <Container className="matrix">
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Machine/part</th>
                  {matrix[0].parts.map((part, index) => {
                    return (<td>{index+1}</td>);
                  })}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, mIndex) => (
                  <tr key={`machine-${row.machine}`}>
                    <th scope="row">{row.machine}</th>
                    {row.parts.map((_part, pIndex) => (
                      <td key={`machine-${row.machine}-part-${pIndex+1}`}>
                        <FormGroup check>
                          <Input type="checkbox" onChange={event => {
                            this.props.onChangeMachinePart(mIndex, pIndex, event.target.checked);
                          }} />
                        </FormGroup>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Button onClick={this.props.getClusters}>Get clusters</Button>
        </Row>
      </Container>
    );
  }
}

Matrix.defaultProps = {
  matrix: [{
    machine: 'A',
    parts: [],
  }],
}

Matrix.propTypes = {
  matrix: PropTypes.array,
  onChangeMachinePart: PropTypes.func,
  getClusters: PropTypes.func,
};

export default Matrix;
