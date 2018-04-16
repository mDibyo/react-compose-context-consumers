# react-compose-context-consumers

Higher Order Components for composing React's `Context.Consumer`s. [See it in action!](https://codesandbox.io/s/pmy88rk640)

### Install

```bash
npm install --save react-compose-context-consumers
```

### Introduction

React 16.3 added [a new Context API](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#official-context-api) -
a `Context.Provider` component (for providing the context value), and a `Context.Consumer` component (for consuming the value).
`Context.Consumer`s are added using render props.
A component might want to consume multiple contexts:
```jsx
// example copied from https://reactjs.org/docs/context.html#consuming-multiple-contexts
<ThemeContext.Consumer>
  {theme => (
    <UserContext.Consumer>
      {user => (
        <ProfilePage user={user} theme={theme} />
      )}
    </UserContext.Consumer>
  )}
</ThemeContext.Consumer>
```

This package provides a cleaner and more convenient way to compose `Context.Consumer`s:

```jsx
import Compose from 'react-compose-context-consumers';

...

<Compose theme={ThemeContext.Consumer} user={UserContext.Consumer}>
  {({ theme, user }) => (
    <ProfilePage user={user} theme={theme} />
  )}
</Compose>
```

OR

```jsx
import { compose } from 'react-compose-context-consumers';

const Composed = compose(ThemeContext.Consumer, UserContext.Consumer);

...

<Composed>
  {(theme, user) => (
    <ProfilePage user={user} theme={theme} />
  )}
</Composed>
```
