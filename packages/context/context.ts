/**
 * Creates a context that can be used in Astro components.
 * This function uses generics to allow any type `T` to be used as the context value.
 *
 * @returns A tuple containing the Provider component and a getter function for the current context.
 */
export const createContext = <T extends any>() => {
	// initialize context casted to type `T`.
	let context: T

	/**
	 * Provider component for the context.
	 * This component sets the context value and provides it to its children components.
	 */
	function Provider(
		/** Result parameter (not used in this implementation). */
		_result: any,
		/** Props passed to the Provider, used as the new context value. */
		props: any,
		/** Slot(s) containing the children components. */
		slots: any
	) {
		// overwrite props with a deep clone itself
		// avoid unintended side-effects caused by shared references
		props = structuredClone(props)

		return {
			/* Symbol indicating this is an Astro component object. */
			[Symbol.toStringTag]: 'AstroComponent',
			async *[Symbol.asyncIterator]() {
				// set context to the value provided by props
				// ensure a deep clone of the provided value
				// avoid unintended side-effects caused by shared references
				context = structuredClone(props)

				// yield rendered children components
				yield await slots.default()

				// reset context to undefined after rendering is complete
				context = undefined as T
			},
		}
	}

	/* Flag indicating this is an Astro component factory function. */
	Provider.isAstroComponentFactory = true

	// return a tuple of Provider component and a getter function for the current context
	return [
		Provider,
		() => context,
	] as any as [
		/** Provider component for context. */
		(props: T) => any,
		/** Returns the current context. */
		() => T
	]
}
