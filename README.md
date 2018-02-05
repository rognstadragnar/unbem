<div align="center" style="margin: 100px 0">
  <img 
  src="https://raw.githubusercontent.com/rognstadragnar/unbem/master/unbem.png" alt="unbem">
</div>

# unbem

> A tiny utility for working with BEM in Javascript

## Motivation

Working with BEM in Javascript can be a pain, especially if you are using CSS Modules and JSX.

Having to write stuff like `className={styles['my-block__my-element--modifier']}` gets old fast. Then you find yourself concatinating and conditionally applying classes, and you soon wish death upon your team.

```Javascript
// THIS IS NOT FUN

import styles from './MyComponent.css'

const MyComponent = props => {
  const classes = [
    styles.block__element,
    styles['block__element--some-modifier'],
    props.magicNumber === 42 && styles['block__element--happy']
  ].filter(Boolean).join(' ')

  return (
    <h1 className={classes}>
      Hello, world!
    </h1>
  )
}
```

## Solution

#### Installation

```shell
npm install unbem
```

#### Usage

The `unbem`-function expects the first argument to be either a block or an element. The rest of the arguments get applied as modifiers to the if the string starts with `--` and is not falsy.

```Javascript
import { unbem } from 'unbem'
import styles from './MyComponent.css'

const magicNumber = 42

const classes = unbem(
  styles.block__element,
  '--some-modifier',
  magicNumber === 42 && '--happy'
)

console.log(classes)
// > "block__element block__element--some-modifier block__element--happy"
```

If the string does not start with `--` the class gets append like it is

```Javascript
const classes = unbem(
  styles.block__element,
  styles.something__else,
  magicNumber === 42 && '--happy'
)

// > "block__element something__else something__else--happy"
```

Notice how the `--happy` modifier gets applied to the `something__else` element, not the `block__element` like before. **The modifier gets applied to the previous block/element.**

### Improving conditionally applying classes

`unbind` has a similiar API to the well known `classnames`-module that was originally in `React`.

#### Objects

```Javascript
...

const classes = unbem(styles.block__element, { ['--happy']: magicNumber === 42 })
// > "block__element block__element--happy"
```

#### Arrays

```Javascript
...
const classes = unbem(styles.block__element, [
  '--happy',
  '--super-happy',
  somethingFalsy && '--extremely-happy'
])

// > "block__element block__element--happy block__element--super-happy"
```

##### With JSX

```Javascript
import { unbem } from 'unbem'
import styles from './MyComponent.css'

const MyComponent = ({ isDangerous, magicNumber }) => {
  const classes = unbem(
    styles.block__element,
    '--some-modifier',
    magicNumber === 42 && '--happy'
  ) // block__element block__element--some-modifier block__element--happy

  return (
    <h1 className={classes}>
      Hello, world!
    </h1>
  )
}
```
