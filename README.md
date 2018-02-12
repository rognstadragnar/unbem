<div align="center" style="margin: 100px 0">
  <img 
  src="https://raw.githubusercontent.com/rognstadragnar/unbem/master/unbem.png" alt="unbem">
</div>

# unbem

> A tiny ~**330 byte** utility for working with BEM classes and CSS-modules in Javascript

## Motivation

Working with BEM in Javascript can be a pain, especially if you are using CSS Modules and JSX.

Having to write stuff like `className={styles['my-block__my-element--modifier']}` gets old fast. Then you find yourself concatinating and conditionally applying classes, and you soon wish upon death.

```Javascript
// THIS IS NOT FUN

import styles from './MyComponent.css'

const MyComponent = props => {
  const classes = [
    styles.block__element,
    styles['block__element--some-modifier'],
    props.magicNumber === 42 && styles['block__element--unhappy']
  ].filter(Boolean).join(' ')

  return (
    <h1 className={classes}>
      Hello, world!
    </h1>
  )
}
```

## Solution

### Installation

```shell
npm install unbem
```

### Usage

`Unbem` delivers two functions: `unbem` and `bind`.

#### The `unbem` function
It expects the first argument to be either a block or an element. The rest of the arguments get applied as modifiers to the if the string starts with `--`. Falsy arguments are omitted.

```Javascript
import { unbem } from 'unbem'
import styles from './MyComponent.css'

const magicNumber = 42

const classes = unbem(
  'block__element',
  '--happy',
  magicNumber === 42 && '--super-happy'
)

console.log(classes)
// > "block__element block__element--happy block__element--super-happy"
```

If the string does not start with `--` the class gets append in its entirety.

```Javascript
const classes = unbem(
  'block__element',
  'something__else',
  magicNumber === 42 && '--cool'
)

// > "block__element something__else something__else--cool"
```

Notice how the `--cool` modifier gets applied to the `something__else` element, not the `block__element`. **The modifier gets applied to the previous non-modifier.**

#### The `bind` function

`Unbem` comes with a useful function for when you are using CSS modules. The `bind` function returns an `unbem` function that is bound to a CSS module object.

```Javascript 
import { bind } from 'unbem'
import styles from './component.css'

const unbem = bind(styles)

const myClasses = unbem('my__block', '--active')
// > "prefix-my__block[hash] prefix-my__block--active[hash]

```

### Improving conditionally applying classes

`Unbem` has a similiar API to the well known `classnames` package often used in `React` projects.

Every argument you pass in can be either an a `string`, `object`, or an `array`. 
If the argument is falsy it will be ignored.

#### Strings 
```Javascript
const classes = unbem('block__element', '--happy', somethingTruthy && '--super-happy')
// > "block__element block__element--happy, block__element--super-happy"
```

#### Objects
Every key on the object gets appended if the value is truthy.

```Javascript
const classes = unbem('block__element', { ['--happy']: magicNumber === 42 })
// > "block__element block__element--happy"
```

#### Arrays
`Unbem` resolves each items in the array. You can even have arrays inside arrays (but don't).
```Javascript
const classes = unbem('block__element', [
  '--happy',
  { ['--super-happy']: 2 + 2 === 4 },
  somethingFalsy && '--not-happy'
])

// > "block__element block__element--happy block__element--super-happy"
```
