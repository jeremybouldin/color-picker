const dropdownEl = document.getElementById('dropdown-section')
const dropdownContent = document.getElementById('dropdown-content')
const colorPicker = document.getElementById('eye-dropper-picker')
const callApiBtn = document.getElementById('get-scheme-btn')
const colorBars = document.getElementById('color-bars')

let currentScheme = 'monochrome'
let dropdownOpen = false
let selectedColor = 'F55A5A'
let colorArray = ['#F55A5A', '#2B283A', '#FBF3AB', '#AAD1B6', '#A626D3']

// Color picker listener
colorPicker.addEventListener('change', updateSelectedColor)

// Submit API when click 'get color scheme'
callApiBtn.addEventListener('click', callApi)

// Close drop down if click outside of it
window.addEventListener('click', (e) => {
    const clickedOnDropdown = e.target.closest('#dropdown-content')

    if (!clickedOnDropdown) {
        closeDropDown()
    }
})

// Functionality for adding/removing bold/checks on dropdown options
document.addEventListener('click', (e) => {
    if (e.target.dataset.scheme) {
        removeBold()
        removeChecks()
        currentScheme = e.target.dataset.scheme
        addBold()
        addCheck()
        document.getElementById('current-scheme-text').textContent =
            currentScheme[0].toUpperCase() + currentScheme.substring(1)
        closeDropDown()
    } else if (e.target.dataset.colorBar) {
        copyColorCode(e.target.dataset.colorBar)
    } else if (e.target.dataset.colorCode) {
        copyColorCode(e.target.dataset.colorCode)
    }
})

// Open drop down
dropdownEl.addEventListener('click', (e) => {
    e.stopPropagation()
    dropdownOpen === false ? openDropDown() : closeDropDown()
})

function copyColorCode(arrayLocation) {
    let colorCode = colorArray[arrayLocation]
    navigator.clipboard.writeText(colorCode)
    alert('Copied ' + colorCode)
}

// Color selector
function updateSelectedColor(event) {
    let str = event.target.value
    selectedColor = str.substring(1)
}

// Remove old color entries from array and start with seed (selected) color
function resetColorArray() {
    colorArray = []
    colorArray.push('#' + selectedColor)
}

// Dropdown bold/checks add/remove
function removeBold() {
    if (currentScheme) {
        const match = locateDropdownTextElement()
        match.classList.remove('bold')
    }
}

function removeChecks() {
    if (currentScheme) {
        const match = locateDropdownCheckElement()
        match.classList.add('hidden')
    }
}

function addBold() {
    const match = locateDropdownTextElement()
    match.classList.add('bold')
}

function addCheck() {
    const match = locateDropdownCheckElement()
    match.classList.remove('hidden')
}

// Lookup html element for adding/removing bold on dropdown
function locateDropdownTextElement() {
    if (currentScheme) {
        return document.getElementById(currentScheme + '-text')
    }
}

// Lookup html element for adding/removing checks on dropdown
function locateDropdownCheckElement() {
    if (currentScheme) {
        return document.getElementById(currentScheme + '-check')
    }
}

// Dropdown open/close
function closeDropDown() {
    dropdownContent.style.display = 'none'
    dropdownOpen = false
}

function openDropDown() {
    dropdownContent.style.display = 'grid'
    dropdownOpen = true
}

// Fetch API call
function callApi() {
    resetColorArray()
    fetch(
        `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${currentScheme}&count=4`
    )
        .then((res) => res.json())
        .then((data) => {
            data.colors.forEach((color) => {
                colorArray.push(color.hex.value)
            })
            updateColors()
        })
}

// Update color bars and codes
function updateColors() {
    for (let i = 1; i < 6; i++) {
        document.getElementById('color-' + i.toString()).style.background =
            colorArray[i - 1]

        document.getElementById('color-code-' + i.toString()).textContent =
            colorArray[i - 1]
    }
}
