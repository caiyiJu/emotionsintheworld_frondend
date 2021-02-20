import React from 'react';
import {Card, CardColumns, CardGroup} from "react-bootstrap";
//{props.picture}
const Image = (props) => {
  return (
    <Card  variant="top" className="text-dark">
      <Card.Img variant="top" src={props.pic} />
      <Card.Body>
        <Card.Title>Classification: {props.classification}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  );
};

export default Image;
