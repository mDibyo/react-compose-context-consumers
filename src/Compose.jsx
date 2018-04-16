import React from 'react';

import compose from './compose';

class Compose extends React.PureComponent {
  render() {
    const { children, ...contextConsumersMap } = this.props;
    const contextKeys = Object.keys(contextConsumersMap);
    const contextConsumers = contextKeys.map(k => contextConsumersMap[k]);

    const Composed = compose(...contextConsumers);
    return (
      <Composed>
        {(...contexts) => {
          const contextsMap = {};
          contextKeys.forEach((k, idx) => contextsMap[k] = contexts[idx]);
          return this.props.children(contextsMap);
        }}
      </Composed>
    );
  }
}

export default Compose;
