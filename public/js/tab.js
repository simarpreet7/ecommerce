const tabby = document.querySelector('.tabby')
// Get a NodeList of the tabs
const tabs = tabby.querySelectorAll('.tab')
// Get a NodeList of the contents
const tabContents = tabby.querySelectorAll('.tab-content')

tabs.forEach(button => {
	button.addEventListener('click', event => {		
		// Store the "theme" being selected
		const tabTheme = button.getAttribute('data-theme')		
		if (button.classList.contains('is-selected')) {			
			// Abort if it's already selected
			return
		} else {						
			// Go through the NodeList and remove 'old' is-selected
			tabs.forEach(tab => {				
				if (tab.classList.contains('is-selected')) {	
					tab.classList.remove('is-selected')
				} 
			})
			// Add 'new' is-selected to clicked button
			button.classList.add('is-selected')		
		}
			
		// Loop through content sections' NodeList
		tabContents.forEach(section => {
			// Store the data-theme for each section
			const contentTheme = section.getAttribute('data-theme')
			// check if the section data-theme is the same as the one that was clicked on the Tab button
			if (contentTheme === tabTheme) {
				section.classList.add('is-selected')
			} else {
				section.classList.remove('is-selected')
			}
		})
	})
})
