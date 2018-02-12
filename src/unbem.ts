let prevAppendable = null

function unbem(...args) {
  return args.filter(Boolean).map(arg => {
    const type = typeof arg
    if (type === 'string' || type === 'number') {
      if (arg.indexOf('--') === 0) {
        return prevAppendable && prevAppendable + arg
      } else {
        if (arg.indexOf('--') < 0) {
          prevAppendable = arg
        }
        return arg
      }
    } else if (Array.isArray(arg)) {
      return unbem(...arg)
    } else if (type === 'object') {
      return unbem(...Object.keys(arg).filter(a => arg[a]))
    }
  }).filter(Boolean).join(' ')
}

export { unbem }