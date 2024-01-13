export const createContext = () => {
	let context

	function Provider(_result, props, slots) {
		props = structuredClone(props)

		return {
			[Symbol.toStringTag]: 'AstroComponent',
			async *[Symbol.asyncIterator]() {
				context = structuredClone(props)

				yield await slots.default()

				context = undefined
			}
		}
	}

	Provider.isAstroComponentFactory = true

	return [
		Provider,
		() => context,
	]
}
