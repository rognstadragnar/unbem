function bind(styleObj) {
  this.prevAppendable = null
  this.cx = (...args) => {
		return args.filter(Boolean).map(arg => {
      const type = typeof arg
    	if (type === 'string' || type === 'number') {
        	if (arg.indexOf('--') === 0) {
            return (styleObj && styleObj[this.prevAppendable + arg])
          } else {
            if (arg.indexOf('--') < 0) this.prevAppendable = arg
            return (styleObj && styleObj[arg])
          }
        } else if (Array.isArray(arg)) {
        	return this.cx(...arg)
        } else if (type === 'object') {
        	return this.cx(...Object.keys(arg).filter(a => arg[a]))
        }
    }).filter(Boolean).join(' ')
  }
}


export { bind }