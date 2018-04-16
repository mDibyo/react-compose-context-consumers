import React from 'react';

import compose from './compose';
import { elementsWillChange } from './utils';

class Compose extends React.PureComponent {
  state = {
    sortedContextNames: [],
    sortedContextConsumers: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { children, ...contextConsumersMap  } = nextProps;
    // We sort context names to make comparison against previous props simpler.
    const nextSortedContextNames = Object.keys(contextConsumersMap).sort();
    const nextSortedContextConsumers = nextSortedContextNames.map(k => contextConsumersMap[k]);

    if (!elementsWillChange(nextSortedContextNames, prevState.sortedContextNames) &&
        !elementsWillChange(nextSortedContextConsumers, prevState.sortedContextConsumers)) {
      return null;
    }

    return {
      sortedContextNames: nextSortedContextNames,
      sortedContextConsumers: nextSortedContextConsumers,
      Composed: compose(...nextSortedContextConsumers),
    };
  }

  render() {
    const Composed = this.state.Composed;
    return (
      <Composed>
        {(...contexts) => {
          const contextsMap = {};
          this.state.sortedContextNames.forEach((k, idx) => contextsMap[k] = contexts[idx]);

          return this.props.children(contextsMap);
        }}
      </Composed>
    );
  }
}

export default Compose;
