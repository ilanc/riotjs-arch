<tick-cross-toggle>
	<i class={tickClass()} onclick={toggleTick}></i><i class={crossClass()} onclick={toggleCross}></i>

	<script type="es6">
		console.log('tick-cross-toggle.tag')

    import '../node_modules/font-awesome/css/font-awesome.css'
    import {CheckState} from './tick-cross-toggle.js'

    var self = this
    self.state = opts.state || CheckState.NotSet
		self.onchange = opts.onchange

    this.tickClass = () => {
			if (self.state === CheckState.Checked)
				return 'fa fa-fw fa-check-square text-navy'
			else
				return 'fa fa-fw fa-check'
    }

    this.crossClass = () => {
			if (self.state === CheckState.Unchecked)
				return 'fa fa-fw fa-times-rectangle text-danger'
			else
				return 'fa fa-fw fa-times'
    }

    this.toggleTick = () => {
			self.state = self.state === CheckState.Checked ? CheckState.NotSet : CheckState.Checked
			self.onchange({id: opts.id, state: self.state})
		}

		this.toggleCross = () => {
			self.state = self.state === CheckState.Unchecked ? CheckState.NotSet : CheckState.Unchecked;
			self.onchange({id: opts.id, state: self.state})
		}

	</script>

</tick-cross-toggle>
