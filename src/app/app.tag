<app>
	<div class="tr-wrapper">
		<!--Header-->
		<header>
			<div class="tr-tagline">RiotJS app architecture</div>
			<img src="../all/logo.svg" alt="Trust ID" height="30" class="tr-logo" />
		</header>

		<!-- Screen -->
		<section class="tr-content">
			<p style="padding-top:60px;text-align: center;">
				<label class="tr-label" style="font-size: 20px;">App</label>
			</p>
			<p class="tr-text-center">
				<p>Check #1 ok? <tick-cross-toggle id="check1" state={state.check1} onchange={tickChange}></tick-cross-toggle></p>
				<p>Check #2 ok? <tick-cross-toggle id="check2" state={state.check2} onchange={tickChange}></tick-cross-toggle></p>
				<p>Check #3 ok? <tick-cross-toggle id="check3" state={state.check3} onchange={tickChange}></tick-cross-toggle></p>
				<pre>{JSON.stringify(state, null, 4)}</pre>
			</p>
		</section>
		<div class="tr-push"></div>
	</div>
	<footer>&copy; Trust ID 2017. All rights reserved.</footer>

	<script type="es6">

		import {State} from './state.js'
    import '../tick-cross-toggle/tick-cross-toggle.tag'

    this.state = State
		this.tickChange = (e) => {
      //console.log('tickChange', e)
      this.state[e.id] = e.state
			this.update()
    }

	</script>
</app>
