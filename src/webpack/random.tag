<random>
  <h3>{ opts.title }</h3>

  <button onclick={ generate }>
    Generate
  </button>

  <h1>
    { number }
  </h1>
  <img src="svg-logo-h.svg" height="30" />

  <logs logs={ logs } onclear={ clearLogs }></logs>

  <script>
    import './logs.tag'

    this.number = null
    this.logs = []

    this.generate = (e) => {
      this.logs.push({ text: `Generate button clicked. Even type is ${ e.type }` })
      this.number = Math.floor(Math.random()*10000)
    }

    this.clearLogs = (e) => {
      this.logs = []
    }

    this.generate({ type: 'custom' })
  </script>
</random>
