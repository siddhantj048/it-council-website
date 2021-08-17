window.onload = () => {
    if (localStorage.getItem('filledForm') === 'true') {
        document.querySelector('.Discord').style.display = 'flex'
        document.querySelector('.correct').style.display = 'none'
        document.querySelector('.qa').style.display = 'none'
        document.querySelector('.incorrect').style.display = 'none'
    }
    let questions = {
        1: ['What is the full form of RAM?', 'random access memory'],
        2: ['What is the full form of ROM?', 'read only memory'],
        3: ['What is the full form of AI?', 'artificial intelligence'],
        4: ['What does CPU stand for?', 'central processing unit'],
        5: ['What does IP stand for in IP Address?', 'internet protocol'],
        6: ['What is the full form of USB', 'universal serial bus'],
        7: ['Which language does a computer understand', 'binary'],
        8: ['What does the Internet prefix WWW stand for?', 'world wide web'],
        9: ['What does WLAN stand for?', 'wireless local area network'],
        10: ['What is the full form of URL?', 'universal resource locator'],
    }

    function randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }
    const question = randomNumber(1, 10)
    document.querySelector('.question').innerHTML =
        'Q) ' + questions[question][0]

    const answerForm = document.querySelector('.answer-form')
    const answerField = document.querySelector('.answer-field')
    const infoForm = document.querySelector('.correct')
    answerForm.addEventListener('submit', e => {
        e.preventDefault()
        if (
            answerField.value.toLowerCase() ===
            questions[question][1].toLowerCase()
        ) {
            document.querySelector('.incorrect').style.display = 'none'
            document.querySelector('.correct').style.display = 'block'
            document.querySelector('.qa').style.display = 'none'
        } else {
            document.querySelector('.incorrect').style.display = 'block'
            document.querySelector('.correct').style.display = 'none'
        }
    })

    infoForm.addEventListener('submit', e => {
        e.preventDefault()
        let name = document.getElementById('name').value
        let grade = document.getElementById('class').value
        let section = document.getElementById('section').value
        let adm = document.getElementById('adm').value
        let discord = document.getElementById('discord').value
        let phone = document.getElementById('phone').value
         let email = document.getElementById('email').value

        fetch('https://it-council-api1.herokuapp.com/backend_', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                class: grade,
                section: section,
                dps_admission_number: adm,
                discord: discord,
                phone: phone,
                email: email
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    document.querySelector('.Discord').style.display = 'flex'
                    document.querySelector('.correct').style.display = 'none'
                    localStorage.setItem('filledForm', true)
                } else {
                    fetch('https://it-council-api2.herokuapp.com/backend_', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            class: grade,
                            section: section,
                            dps_admission_number: adm,
                            discord: discord,
                            phone: phone,
                            email: email
                        }),
                    })
                        .then(response => {
                            if (response.status === 200) {
                                document.querySelector(
                                    '.Discord',
                                ).style.display = 'flex'
                                document.querySelector(
                                    '.correct',
                                ).style.display = 'none'
                                localStorage.setItem('filledForm', true)
                            } else {
                                alert(
                                    'There was an issue while adding your registration. Please fill the form again in a while and submit.',
                                )
                            }
                        })
                        .catch(error => console.error(error))
                }
            })
            .catch(error => console.error(error))
    })
}
