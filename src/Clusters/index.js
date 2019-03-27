import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

// Styles
import './Clusters.css';

class Clusters extends Component {
  render() {
    const { clusters } = this.props;
    return !!clusters.length && (
      <Container className="clusters">
        {clusters.map((singleCluster, cIndex) => (
          <div
            className="cluster"
            key={`cluster-${cIndex}`}
          >
            <h2>
              {`${singleCluster.length} cluster${singleCluster.length === 1 ? '' : 's'}:`}
            </h2>
            <Row className="groups">
              {singleCluster.map((group, gIndex) => (
                <Col key={`group-${gIndex}`} className="group">
                  {group.map(machine => (
                    <span
                      key={`cluster-machine-${machine.machine}`}
                      className="machine"
                    >
                        {machine.machine}
                    </span>
                  ))}
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    )
  }
}

Clusters.defaultProps = {
  clusters: [],
}

Clusters.propTypes = {
  clusters: PropTypes.array,
};

export default Clusters;
