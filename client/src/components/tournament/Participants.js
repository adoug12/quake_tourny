import React from 'react';
import Spinner from '../Spinner';

export default props => {
  if (props.participants.loading) {
    return <Spinner />;
  } else {
    return (
      <div className="container border-left border-right border-bottom">
        <div className="row">
          <div className="col-md-3 p-4">
            <ul class="list-group">
              {props.participants.data.map(player => (
                <li className="list-group-item">{player.name}</li>
              ))}
            </ul>
          </div>
          <div className="col">Hello</div>
        </div>
      </div>
    );
  }
};
