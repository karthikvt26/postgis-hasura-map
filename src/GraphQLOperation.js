import React, { useState, useEffect } from 'react';

const Variables = ({
  lat,
  long,
  bound
}) => {
  const [isChanged, updateChanged] = useState(false);
  const updateIsChanged = (val) => {
    updateChanged(true);
    setTimeout(() => {
      updateChanged(false);
    }, 3000);
  };
  useEffect(updateIsChanged, [lat, long]);
  return (
    <div>
      <span>{'{'}</span>
      <div className="variable">
        <span className="key">
          "lat":
        </span>
        <span className={`value ${isChanged && 'showChanged'}`}>
          {lat}
        </span>
      </div>
      <div className="variable">
        <span className="key">
          "long":
        </span>
        <span className={`value ${isChanged && 'showChanged'}`}>
          {long}
        </span>
      </div>
      <div className="variable">
        <span className="key">
          "bound":
        </span>
        <span className="value">
          {bound}
        </span>
      </div>
      <span>{'}'}</span>
    </div>
  );
};

const GraphQLOperation = (props) => {
  const { request, variables, response } = props;

  return (
    <div className="CodeBlock">
      <h3> GraphQL Query </h3>
      <div>
        <pre><code>{request}</code></pre>
      </div>
      <h3> Variables </h3>
      <Variables
        { ...variables }
      />
      <h3> Response </h3>
      <div>
        <pre><code>{(response && JSON.stringify(response, null, 4)) || 'Loading'}</code></pre>
      </div>
    </div>
  );
};

export default GraphQLOperation;
