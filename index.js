const dropdownEl = document.getElementById('dropdown-section')
const dropdownContent = document.getElementById('dropdown-content')
let currentScheme = ''
let dropdownOpen = false

window.addEventListener('click', (e) => {
    const clickedOnDropdown = e.target.closest('#dropdown-content')

    if (!clickedOnDropdown) {
        closeDropDown()
    }
})

document.addEventListener('click', (e) => {
    if (e.target.dataset.scheme) {
        removeBold()
        removeChecks()
        currentScheme = e.target.dataset.scheme
        addBold()
        addCheck()
        document.getElementById('current-scheme-text').textContent =
            currentScheme[0].toUpperCase() + currentScheme.substring(1)
        // removeBoldAndCheck()
        // console.log(currentScheme)
    }
    // addBold()
})

dropdownEl.addEventListener('click', (e) => {
    e.stopPropagation()
    dropdownOpen === false ? openDropDown() : closeDropDown()
})

function removeBoldAndCheck() {
    const currentDropDownItem = document.getElementById(currentScheme)

    const currentChild = currentDropDownItem.querySelector('.dropdown-name')
}

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
    // console.log(currentScheme)
}

function addCheck() {
    const match = locateDropdownCheckElement()
    match.classList.remove('hidden')
}

function locateDropdownTextElement() {
    if (currentScheme) {
        return document.getElementById(currentScheme + '-text')
    }
}

function locateDropdownCheckElement() {
    if (currentScheme) {
        return document.getElementById(currentScheme + '-check')
    }
}

function closeDropDown() {
    dropdownContent.style.display = 'none'
    dropdownOpen = false
}

function openDropDown() {
    dropdownContent.style.display = 'grid'
    dropdownOpen = true
}
