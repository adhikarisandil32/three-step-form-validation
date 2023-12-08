const form = document.querySelector("#form-all-pages")
const formPages = [...form.children]

let currentPageNumber = 1
let numberOfPages = 3

//to get the languages and faculties that have been ticked
const tickedLanguages = {}
const tickedFaculties = {}

//individual field error status with their checker function in one page
const pageOneErrorDetails = {
  firstNameValidationError: {
    errorStatus: true,
    checkerFunction: () => {
      nameValidationErrorCheck(
        document.querySelector("#first-name").value,
        "First Name",
        document.querySelector("#first-name-error")
      )
    },
  },
  middleNameValidationError: {
    errorStatus: false,
    checkerFunction: () => {
      nameValidationErrorCheck(
        document.querySelector("#middle-name").value,
        "Middle Name",
        document.querySelector("#middle-name-error")
      )
    },
  },
  lastNameValidationError: {
    errorStatus: true,
    checkerFunction: () => {
      nameValidationErrorCheck(
        document.querySelector("#last-name").value,
        "Last Name",
        document.querySelector("#last-name-error")
      )
    },
  },
  genderValidationError: {
    errorStatus: true,
    checkerFunction: () => {
      genderValidationErrorCheck(
        form.gender.value,
        document.querySelector("#gender-error")
      )
    },
  },
  birthDateValidationError: {
    errorStatus: true,
    checkerFunction: () => {
      ageValidationErrorCheck(
        Number(document.querySelector("#age-display-box").value),
        document.querySelector("#birth-date-error")
      )
    },
  },
  permanentAddressValidationError: {
    errorStatus: true,
    checkerFunction: () => {
      addressValidationErrorCheck(
        document.querySelector("#permanent-address").value,
        "Permanent Address",
        document.querySelector("#permanent-address-error")
      )
    },
  },
  temporaryAddressValidationError: {
    errorStatus: true,
    checkerFunction: () => {
      addressValidationErrorCheck(
        document.querySelector("#temporary-address").value,
        "Temporary Address",
        document.querySelector("#temporary-address-error")
      )
    },
  },
  languageValidationError: {
    errorStatus: true,
    checkerFunction: () => {
      languageValidationErrorCheck(
        tickedLanguages,
        document.querySelector("#language-error")
      )
    },
  },
  aboutYourselfValidationError: {
    errorStatus: true,
    checkerFunction: () => {
      aboutYourselfValidationErrorCheck(
        document.querySelector("#about-yourself").value,
        document.querySelector("#about-yourself-error")
      )
    },
  },
}

//individual field error status with their checker function in second page
const pageTwoErrorDetails = {
  facultyValidationError: {
    errorStatus: true,
    checkerFunction: () => {
      facultyValidationErrorCheck(
        tickedFaculties,
        document.querySelector("#faculty-error")
      )
    },
  },
  qualificationValidationError: {
    errorStatus: true,
    checkerFunction: () => {
      qualificationValidationErrorCheck(
        form.qualification.value,
        document.querySelector("#qualification-error")
      )
    },
  },
  experienceValidationError: {
    errorStatus: true,
    checkerFunction: () => {
      experienceValidationErrorCheck(
        document.querySelector("#experience").value,
        document.querySelector("#experience-error")
      )
    },
  },
  whyHireValidationError: {
    errorStatus: true,
    checkerFunction: () => {
      whyHireValidationErrorCheck(
        document.querySelector("#why-hire").value,
        document.querySelector("#why-hire-error")
      )
    },
  },
}

//Form Field's Objected Collection to show @ information verification
const completeFormResults = {
  fullName: () => {
    const firstName = document.querySelector("#first-name").value
    const middleName = document.querySelector("#middle-name").value
    const lastName = document.querySelector("#last-name").value

    return `${firstName} ${middleName} ${lastName}`
  },
  gender: () => {
    const genderValueToGenderDisplayNamePair = {
      male: "Male",
      female: "Female",
    }
    return genderValueToGenderDisplayNamePair[form.gender.value]
  },
  birthDate: () => {
    return document.querySelector("#date-display-box").value
  },
  age: () => {
    return document.querySelector("#age-display-box").value
  },
  languages: () => {
    const languageValueToLanguageDisplayNamePair = {
      english: "English",
      nepali: "Nepali",
      maithili: "Maithili",
      newari: "Nepal Bhasha",
    }
    const languagesToDisplay = []

    for (let eachLanguage in tickedLanguages) {
      if (tickedLanguages[eachLanguage]) {
        languagesToDisplay.push(
          languageValueToLanguageDisplayNamePair[eachLanguage]
        )
      }
    }

    return languagesToDisplay
  },
  aboutYourself: () => {
    return document.querySelector("#about-yourself").value
  },
  faculty: () => {
    const facualtyValueToFacultyDisplayNamePair = {
      "mathematics-10": "Mathematics (9 & 10)",
      "computer-10": "Computer Science (9 & 10)",
      "science-10": "Science (9 & 10)",
      "optionalmath-10": "Optional Mathematics (9 & 10)",
      "mathematics-12": "Mathematics (11 & 12)",
      "bio-science-12": "Biology (11 & 12)",
      "chemistry-12": "Chemistry (11 & 12)",
      "physics-12": "Physics (11 & 12)",
    }
    const facultiesToDisplay = []

    for (let eachFaculty in tickedFaculties) {
      if (tickedFaculties[eachFaculty]) {
        facultiesToDisplay.push(
          facualtyValueToFacultyDisplayNamePair[eachFaculty]
        )
      }
    }

    return facultiesToDisplay
  },
  academicQualification: () => {
    const qualificationValuesToQualificationDisplayNamePair = {
      bachelors: "Bachelor's Degree",
      masters: "Master's Degree",
      phd: "PhD",
    }

    return qualificationValuesToQualificationDisplayNamePair[
      form.qualification.value
    ]
  },
  experience: () => {
    return document.querySelector("#experience").value
  },
  whyHire: () => {
    return document.querySelector("#why-hire").value
  },
}

//adding event listener to form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault()
  alert("Form Submitted Successfully!")
  location.reload()
})

/* Name Validation */
//function to check if text contains any numbers or special characters
function containsOtherThanAlphabets(text) {
  let otherThanAlphabets = false

  for (let i = 0; i < text.length; i++) {
    if (
      text.toUpperCase().charCodeAt(i) > 90 ||
      text.toUpperCase().charCodeAt(i) < 65
    ) {
      otherThanAlphabets = true
      break
    }
  }
  return otherThanAlphabets
}

// first-name validation error checking function
// nameHalf = "john" or "doe", elementToShowError = HTML Element, nameHalfType = First Name or Last Name
function nameValidationErrorCheck(nameHalf, nameHalfType, elementToShowError) {
  //making key of pageOneErrorDetails based on nameHalfType
  validationErrorType = {
    "First Name": "firstNameValidationError",
    "Middle Name": "middleNameValidationError",
    "Last Name": "lastNameValidationError",
  }

  if (nameHalf === "" && nameHalfType !== "Middle Name") {
    elementToShowError.innerText = `${nameHalfType} cannot be empty.`
    pageOneErrorDetails[validationErrorType[nameHalfType]].errorStatus = true
  } else if (containsOtherThanAlphabets(nameHalf)) {
    elementToShowError.innerText = `Invalid ${nameHalfType}`
    pageOneErrorDetails[validationErrorType[nameHalfType]].errorStatus = true
  } else {
    elementToShowError.innerText = ""
    pageOneErrorDetails[validationErrorType[nameHalfType]].errorStatus = false
  }
}

document.querySelector("#first-name").addEventListener("keyup", (e) => {
  nameValidationErrorCheck(
    e.target.value,
    "First Name",
    document.querySelector("#first-name-error")
  )
})
document.querySelector("#first-name").addEventListener("blur", (e) => {
  nameValidationErrorCheck(
    e.target.value,
    "First Name",
    document.querySelector("#first-name-error")
  )
})

document.querySelector("#middle-name").addEventListener("keyup", (e) => {
  nameValidationErrorCheck(
    e.target.value,
    "Middle Name",
    document.querySelector("#middle-name-error")
  )
})

document.querySelector("#last-name").addEventListener("keyup", (e) => {
  nameValidationErrorCheck(
    e.target.value,
    "Last Name",
    document.querySelector("#last-name-error")
  )
})
document.querySelector("#last-name").addEventListener("blur", (e) => {
  nameValidationErrorCheck(
    e.target.value,
    "Last Name",
    document.querySelector("#last-name-error")
  )
})

/* Gender Error */
function genderValidationErrorCheck(genderValue, elementToShowError) {
  if (genderValue === "") {
    elementToShowError.innerText = "This field is required"
    pageOneErrorDetails.genderValidationError.errorStatus = true
  } else {
    elementToShowError.innerText = ""
    pageOneErrorDetails.genderValidationError.errorStatus = false
  }
}

form.gender.forEach((element) => {
  element.addEventListener("change", () => {
    genderValidationErrorCheck(
      form.gender.value,
      document.querySelector("#gender-error")
    )
  })
})

/* Date Validation */
function ageValidationErrorCheck(age, elementToShowError) {
  if (age === 0) {
    elementToShowError.innerText = "Date field to be filled all the way."
    pageOneErrorDetails.birthDateValidationError.errorStatus = true
  } else if (age < 23 || age > 50) {
    elementToShowError.innerText = "Must be 23 y/o at least and 50 y/o at most."
    pageOneErrorDetails.birthDateValidationError.errorStatus = true
  } else {
    elementToShowError.innerText = ""
    pageOneErrorDetails.birthDateValidationError.errorStatus = false
  }
}

document.querySelector("#date-display-box").addEventListener("change", (e) => {
  let birthDate = new Date(e.target.value)
  let currentDate = new Date()
  let currentAge = Math.floor(
    (currentDate - birthDate) / (1000 * 60 * 60 * 24 * 365.25)
  )

  document.querySelector("#age-display-box").value = e.target.value
    ? currentAge
    : ""

  ageValidationErrorCheck(
    Number(document.querySelector("#age-display-box").value),
    document.querySelector("#birth-date-error")
  )
})
document.querySelector("#date-display-box").addEventListener("blur", () => {
  ageValidationErrorCheck(
    Number(document.querySelector("#age-display-box").value),
    document.querySelector("#birth-date-error")
  )
})

/* Address Validation */
function addressValidationErrorCheck(address, addressType, elementToShowError) {
  //making key of pageOneErrorDetails based on addressType
  validationErrorType = {
    "Permanent Address": "permanentAddressValidationError",
    "Temporary Address": "temporaryAddressValidationError",
  }

  if (address === "") {
    elementToShowError.innerText = `${addressType} cannot be empty.`
    pageOneErrorDetails[validationErrorType[addressType]].errorStatus = true
  } else {
    elementToShowError.innerText = ""
    pageOneErrorDetails[validationErrorType[addressType]].errorStatus = false
  }
}

document.querySelector("#permanent-address").addEventListener("keyup", (e) => {
  addressValidationErrorCheck(
    e.target.value,
    "Permanent Address",
    document.querySelector("#permanent-address-error")
  )
})
document.querySelector("#permanent-address").addEventListener("blur", (e) => {
  addressValidationErrorCheck(
    e.target.value,
    "Permanent Address",
    document.querySelector("#permanent-address-error")
  )
})

document.querySelector("#temporary-address").addEventListener("keyup", (e) => {
  addressValidationErrorCheck(
    e.target.value,
    "Temporary Address",
    document.querySelector("#temporary-address-error")
  )
})
document.querySelector("#temporary-address").addEventListener("blur", (e) => {
  addressValidationErrorCheck(
    e.target.value,
    "Temporary Address",
    document.querySelector("#temporary-address-error")
  )
})

/* Language Validation */
function languageValidationErrorCheck(languages, elementToShowError) {
  if (!languages.english || !languages.nepali) {
    elementToShowError.innerText = `Candidate must know English and Nepali.`
    pageOneErrorDetails.languageValidationError.errorStatus = true
  } else {
    elementToShowError.innerText = ""
    pageOneErrorDetails.languageValidationError.errorStatus = false
  }
}

form.language.forEach((element) => {
  tickedLanguages[element.value] = element.checked
  element.addEventListener("change", (e) => {
    tickedLanguages[e.target.value] = e.target.checked
    languageValidationErrorCheck(
      tickedLanguages,
      document.querySelector("#language-error")
    )
  })
})

/* About Yourself Validation */
function aboutYourselfValidationErrorCheck(
  aboutYourselfValue,
  elementToShowError
) {
  const numberOfWords = aboutYourselfValue.split(" ").length

  if (aboutYourselfValue === "") {
    elementToShowError.innerText = "This field cannot be empty."
    pageOneErrorDetails.aboutYourselfValidationError.errorStatus = true
  } else if (numberOfWords > 100) {
    elementToShowError.innerText = "No more than 100 words."
    pageOneErrorDetails.aboutYourselfValidationError.errorStatus = true
  } else {
    elementToShowError.innerText = ""
    pageOneErrorDetails.aboutYourselfValidationError.errorStatus = false
  }
}

document.querySelector("#about-yourself").addEventListener("keyup", (e) => {
  aboutYourselfValidationErrorCheck(
    e.target.value,
    document.querySelector("#about-yourself-error")
  )
})
document.querySelector("#about-yourself").addEventListener("blur", (e) => {
  aboutYourselfValidationErrorCheck(
    e.target.value,
    document.querySelector("#about-yourself-error")
  )
})

/* Faculty Validation */
function facultyValidationErrorCheck(faculties, elementToShowError) {
  let numberOfFaculties = 0
  for (let eachFaculty in faculties) {
    if (faculties[eachFaculty]) {
      numberOfFaculties++
    }
  }
  if (numberOfFaculties <= 0) {
    elementToShowError.innerText = "You must be able to teach at least one."
    pageTwoErrorDetails.facultyValidationError.errorStatus = true
  } else {
    elementToShowError.innerText = ""
    pageTwoErrorDetails.facultyValidationError.errorStatus = false
  }
}

form.faculty.forEach((element) => {
  tickedFaculties[element.value] = element.checked
  element.addEventListener("change", (e) => {
    tickedFaculties[e.target.value] = e.target.checked
    facultyValidationErrorCheck(
      tickedFaculties,
      document.querySelector("#faculty-error")
    )
  })
})

/* Academic Qualification Validation */
function qualificationValidationErrorCheck(
  qualificationValue,
  elementToShowError
) {
  if (qualificationValue === "") {
    elementToShowError.innerText = "You must provide qualification."
    pageTwoErrorDetails.qualificationValidationError.errorStatus = true
  } else {
    elementToShowError.innerText = ""
    pageTwoErrorDetails.qualificationValidationError.errorStatus = false
  }
}

form.qualification.forEach((element) => {
  element.addEventListener("change", () => {
    qualificationValidationErrorCheck(
      form.qualification.value,
      document.querySelector("#qualification-error")
    )
  })
})

/* Experience Validation */
function experienceValidationErrorCheck(experienceValue, elementToShowError) {
  if (experienceValue.includes(".")) {
    elementToShowError.innerText = "Please provide integer value only"
    pageTwoErrorDetails.experienceValidationError.errorStatus = true
  } else if (Number(experienceValue) < 0 || experienceValue === "") {
    elementToShowError.innerText = "Please provide valid experience"
    pageTwoErrorDetails.experienceValidationError.errorStatus = true
  } else {
    elementToShowError.innerText = ""
    pageTwoErrorDetails.experienceValidationError.errorStatus = false
  }
}

document.querySelector("#experience").addEventListener("keyup", (e) => {
  experienceValidationErrorCheck(
    e.target.value,
    document.querySelector("#experience-error")
  )
})
document.querySelector("#experience").addEventListener("blur", (e) => {
  experienceValidationErrorCheck(
    e.target.value,
    document.querySelector("#experience-error")
  )
})

/* "Why Hire" Validation */
function whyHireValidationErrorCheck(whyHire, elementToShowError) {
  const numberOfWords = whyHire.split(" ").length

  if (numberOfWords > 100) {
    elementToShowError.innerText = "No more than 100 words"
    pageTwoErrorDetails.whyHireValidationError.errorStatus = true
  } else if (whyHire === "") {
    elementToShowError.innerText = "This field is required"
    pageTwoErrorDetails.whyHireValidationError.errorStatus = true
  } else {
    elementToShowError.innerText = ""
    pageTwoErrorDetails.whyHireValidationError.errorStatus = false
  }
}

document.querySelector("#why-hire").addEventListener("keyup", (e) => {
  whyHireValidationErrorCheck(
    e.target.value,
    document.querySelector("#why-hire-error")
  )
})
document.querySelector("#why-hire").addEventListener("blur", (e) => {
  whyHireValidationErrorCheck(
    e.target.value,
    document.querySelector("#why-hire-error")
  )
})

/* Pagination */
for (let i = 0; i < numberOfPages; i++) {
  paginationParent = document.querySelector("#pagination")
  paginationChild = document.createElement("div")
  paginationParent.appendChild(paginationChild)
}
updatePagination()

function updatePagination() {
  document.querySelector("#pagination").childNodes.forEach((element) => {
    element.classList.remove("active")
  })
  document
    .querySelector("#pagination")
    .children[currentPageNumber - 1].classList.add("active")
}

/* Buttons */
buttonsDisplayStatus()

function buttonsDisplayStatus() {
  if (currentPageNumber === 1) {
    document.querySelector("#previous-button").style.display = "none"
  } else {
    document.querySelector("#previous-button").style.display = "block"
  }

  if (currentPageNumber === numberOfPages) {
    document.querySelector("#next-button").style.display = "none"
  } else {
    document.querySelector("#next-button").style.display = "block"
  }
}

function displayError(errorContainingObjects) {
  for (let eachKey in errorContainingObjects) {
    errorContainingObjects[eachKey].checkerFunction()
  }
}

function updateAndDisplayAllInformation() {
  const updatedHTMLCode = `
    <div>
      <span class="font-bold">Full Name:</span>
      <span>${completeFormResults.fullName()}</span>
    </div>
    <div>
      <span class="font-bold">Gender: </span>
      <span>${completeFormResults.gender()}</span>
    </div>
    <div>
      <span class="font-bold">Birth Date:</span>
      <span>${completeFormResults.birthDate()}</span>
    </div>
    <div>
      <span class="font-bold">Age:</span>
      <span>${completeFormResults.age()}</span>
    </div>
    <div>
      <span class="font-bold">Languages:</span>
      <span>${completeFormResults.languages().toString()}</span>
    </div>
    <div>
      <span class="font-bold">About Yourself:</span>
      <span>
        ${completeFormResults.aboutYourself()}
      </span>
    </div>
    <div>
      <span class="font-bold">Subjects: </span>
      <span>${completeFormResults.faculty().toString()}</span>
    </div>
    <div>
      <span class="font-bold">Academic Qualification:</span>
      <span>${completeFormResults.academicQualification()}</span>
    </div>
    <div>
      <span class="font-bold">Experience: </span>
      <span>${completeFormResults.experience()}</span>
    </div>
    <div>
      <span class="font-bold">Why Should We Hire You ?</span>
      <span>
        ${completeFormResults.whyHire()}
      </span>
    </div>`

  document.querySelector("#information-to-verify").innerHTML = updatedHTMLCode
}

document.querySelector("#previous-button").addEventListener("click", () => {
  currentPageNumber--
  formPages[currentPageNumber - 1].scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "end",
  })

  buttonsDisplayStatus()
  updatePagination()
})

document.querySelector("#next-button").addEventListener("click", () => {
  const pageWiseErrorDetails = [pageOneErrorDetails, pageTwoErrorDetails]

  const errorIn = {}
  const currentErrorDetailsPage = pageWiseErrorDetails[currentPageNumber - 1]

  for (let eachKey in currentErrorDetailsPage) {
    if (currentErrorDetailsPage[eachKey].errorStatus) {
      errorIn[eachKey] = currentErrorDetailsPage[eachKey]
    }
  }

  if (Object.keys(errorIn).length > 0) {
    displayError(errorIn)
    return
  }

  currentPageNumber++
  formPages[currentPageNumber - 1].scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "end",
  })

  if (currentPageNumber === numberOfPages) {
    updateAndDisplayAllInformation()
  }

  buttonsDisplayStatus()
  updatePagination()
})