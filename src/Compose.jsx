import React from 'react';

import compose from './compose';

class Compose extends React.PureComponent {
  state = {
    contextKeys: [],
    Composed: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { children, ...contextConsumersMap } = nextProps;
    const nextContextKeys = Object.keys(contextConsumersMap);
    const contextConsumers = nextContextKeys.map(k => contextConsumersMap[k]);

    const Composed = compose(...contextConsumers);
    return {
      contextKeys: nextContextKeys,
      Composed,
    };
  }

  render() {
    const Composed = this.state.Composed;
    return (
      <Composed>
        {(...contexts) => {
          const contextsMap = {};
          this.state.contextKeys.forEach((k, idx) => contextsMap[k] = contexts[idx]);

          return this.props.children(contextsMap);
        }}
      </Composed>
    );
  }
}

export default Compose;
