import React from 'react';

function compose(...contextConsumers) {
  return class Composed extends React.PureComponent {
    render() {
      const composeHelper = (remainingContextConsumers, collectedContexts = []) => {
        if (!remainingContextConsumers.length) {
          return this.props.children(...collectedContexts);
        }

        const [Next, ...rest] = remainingContextConsumers;
        return (
          <Next>
            {context => composeHelper(rest, [...collectedContexts, context])}
          </Next>
        );
      }

      return composeHelper(contextConsumers);
    }
  }
}

export default compose;

