var userData = {};
var applicationsList = [];
function resetUserData() {
    userData = {
        token: '650a1b39-e8e9-49ee-8e4d-d0b5a1a3420c',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        skills: [],
        work_preference: "from_office",
        had_covid: true,
        had_covid_at: "2022-01-01",
        vaccinated: true,
        vaccinated_at: "2022-01-01",

        will_organize_devtalk: true,
        devtalk_topic: "I would ...",
        something_special: "I am special!"
    };
}

resetUserData();

if (localStorage.getItem('userDataStorage') !== null) {
    userData = JSON.parse(localStorage.getItem('userDataStorage'));
}


var formPages = [
    'mainPage',
    'about',
    'skills-id',
    'covid',
    'devtalks',
    'lastSubmit',
    'thanks'
];

var currentPage = 0;

function validation() {
    if (currentPage === 0) {
        document.getElementById('firstname').value = userData.first_name;
        document.getElementById('lastname').value = userData.last_name;
        document.getElementById('email').value = userData.email;
        document.getElementById('mobile').value = userData.phone;

        return true;
    } else if (currentPage === 1) {
        if (document.getElementById("firstname").checkValidity()
            && document.getElementById("lastname").checkValidity()
            && document.getElementById("email").checkValidity()
            && document.getElementById("mobile").checkValidity()) {

            userData.first_name = document.getElementById('firstname').value;
            userData.last_name = document.getElementById('lastname').value;
            userData.email = document.getElementById('email').value;
            userData.phone = document.getElementById('mobile').value;

            localStorage.setItem('userDataStorage', JSON.stringify(userData));
            return true;
        } else {
            return false;
        }
    } else if (currentPage === 2) {
        if (userData.skills.length > 0) {

            if (userData.work_preference === 'from_office') {
                document.getElementById("prefered_work_from_office").checked = true;
            }
            if (userData.work_preference === 'from_home') {
                document.getElementById("prefered_work_from_home").checked = true;
            }
            if (userData.work_preference === 'hybrid') {
                document.getElementById("prefered_work_hybrid").checked = true;
            }

            if (userData.had_covid === true) {
                document.getElementById("hadcovid_true").checked = true;
            }

            if (userData.had_covid === false) {
                document.getElementById("hadcovid_false").checked = true;
            }

            if (userData.vaccinated === true) {
                document.getElementById("hadvacc_true").checked = true;
            }

            if (userData.vaccinated === false) {
                document.getElementById("hadvacc_false").checked = true;
            }

            document.getElementById("covidDate").value = userData.had_covid_at;
            document.getElementById("vaccDate").value = userData.vaccinated_at;

            localStorage.setItem('userDataStorage', JSON.stringify(userData));
            return true;
        } else {
            alert("Please add skills!");
            return false;
        }
    } else if (currentPage === 3) {

        if (document.getElementById("prefered_work_from_office").checked) {
            userData.work_preference = 'from_office';
        }

        if (document.getElementById("prefered_work_from_home").checked) {
            userData.work_preference = 'from_home';
        }

        if (document.getElementById("prefered_work_hybrid").checked) {
            userData.work_preference = 'hybrid';
        }

        if (document.getElementById("hadcovid_true").checked) {
            userData.had_covid = true;
        }

        if (document.getElementById("hadcovid_false").checked) {
            userData.had_covid = false;
        }

        if (document.getElementById("hadvacc_true").checked) {
            userData.vaccinated = true;
        }

        if (document.getElementById("hadvacc_false").checked) {
            userData.vaccinated = false;
        }

        if (document.getElementById("covidDate").value === "") {
            document.getElementById("covidDate").value = "2022-01-01"
        }

        if (document.getElementById("vaccDate").value === "") {
            document.getElementById("vaccDate").value = "2022-01-01"
        }

        userData.had_covid_at = document.getElementById("covidDate").value;
        userData.vaccinated_at = document.getElementById("vaccDate").value;

        if (userData.will_organize_devtalk === true) {
            document.getElementById("devtalks_radio_true").checked = true;
        }

        if (userData.will_organize_devtalk === false) {
            document.getElementById("devtalks_radio_false").checked = true;
        }

        document.getElementById("devtalksText").value = userData.devtalk_topic;
        document.getElementById("aboutYouText").value = userData.something_special;

        localStorage.setItem('userDataStorage', JSON.stringify(userData));
        return true;

    } else if (currentPage === 4) {
        if (document.getElementById("devtalks_radio_true").checked) {
            userData.will_organize_devtalk = true;
        }

        if (document.getElementById("devtalks_radio_false").checked) {
            userData.will_organize_devtalk = false;
        }
        if (document.getElementById("devtalksText").value.length > 2) {
            userData.devtalk_topic = document.getElementById("devtalksText").value;
        } else {
            alert("Please enter Devtalk text");
            return false;
        }
        if (document.getElementById("aboutYouText").value.length > 2) {
            userData.something_special = document.getElementById("aboutYouText").value;
        } else {
            alert("Please enter something speacial");
            return false;
        }
        localStorage.setItem('userDataStorage', JSON.stringify(userData));
        return true;
    } else {
        return true;
    }
}

function hideAll() {
    var containers = document.getElementsByTagName('container');
    for (var i = 0; i < containers.length; i++) {
        containers[i].style.display = 'none';
    }
}

function showContainer(containerID) {
    hideAll();
    document.getElementById(containerID).style.display = 'flex';
}

function prevPage() {
    if (currentPage > 0) {
        currentPage = currentPage - 1;
    }
    showContainer(formPages[currentPage]);
}

function nextPage() {
    if (currentPage < 6) {
        if (validation()) {
            currentPage = currentPage + 1;
        }
    } else {
        currentPage = 0;
    }
    showContainer(formPages[currentPage]);
}

document.addEventListener('keyup', function (event) {
    /*
    if (event.keyCode === 13) {
        nextPage();
    } else if (event.keyCode === 8) {
        prevPage();
    }
    */
});


function checkPhone(phoneNumber) {
    return phoneNumber.match(/^\+9955\d\d\d\d\d\d\d\d$/g) !== null;
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    return response.status;
}

function submitForm() {
    postData('https://bootcamp-2022.devtest.ge/api/application', userData).then(status => {
        if (status === 201) {
            localStorage.removeItem('userDataStorage');
            resetUserData();
            nextPage();
            getApplications();
            setTimeout(function () {
                nextPage();
            }, 3000);
        } else {
            alert('Something went wrong!');
        }
    });
}

fetch('https://bootcamp-2022.devtest.ge/api/skills')
    .then(response => response.json())
    .then(data => {
        var select = document.getElementById('skills');

        for (var i = 0; i < data.length; i++) {
            var opt = document.createElement('option');
            opt.value = data[i].id;
            opt.innerHTML = data[i].title;
            select.appendChild(opt);
        }

        refreshSkills(userData.skills);
    });

function refreshSkills(skills) {
    var skill_list = document.getElementById('skillList');
    skill_list.innerHTML = '';
    for (var i = 0; i < skills.length; i++) {
        skill_list.innerHTML = skill_list.innerHTML + `<span class="skill-box">
        <p>${skills[i].title}</p>
        <p>Years of Experience: ${skills[i].experience}</p>
        <div class="remove-btn">
        <i class="fa-solid fa-circle-minus" onclick="removeSkill(${i})"></i></div>
    </span><br>`;
    }
}

function removeSkill(id) {
    userData.skills.splice(id, 1);
    refreshSkills(userData.skills);
}

function addSkill() {
    var skillSelect = document.getElementById("skills");
    if (skillSelect.value !== '') {
        userData.skills.push({
            id: Number(skillSelect.value),
            title: skillSelect.options[skillSelect.selectedIndex].text,
            experience: Number(document.getElementById("experience").value)
        })
    }
    refreshSkills(userData.skills);
}

function getApplications() {
    fetch('https://bootcamp-2022.devtest.ge/api/applications?token=650a1b39-e8e9-49ee-8e4d-d0b5a1a3420c')
        .then(response => response.json())
        .then(data => {
            applicationsList = data;
            listApplications();
        });
}

getApplications();

function listApplications() {
    var htmlText = `<div class="subm-title">
    <h1>Submitted Applications</h1>
</div>`;
    var skillsHtml = ``;
    for (var i = 0; i < applicationsList.length; i++) {

        skillsHtml = ``;

        for (var k = 0; k < applicationsList[i].skills.length; k++) {  

            skillsHtml = skillsHtml + `<tr>
            <th>Skill ID: ${applicationsList[i].skills[k].id}</th>
            <th>Experience: ${applicationsList[i].skills[k].experience}</th>
        </tr>`;
        }

        htmlText = htmlText + `<div class="opn-panel">
    </div>
    <div class="app-form">
        <div class="pers-info">
            <h2>Personal Information</h2>
            <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>E mail</th>
                    <th>Phone</th>
                </tr>
                <tr>
                    <th>${applicationsList[i].first_name}</th>
                    <th>${applicationsList[i].last_name}</th>
                    <th>${applicationsList[i].email}</th>
                    <th>${applicationsList[i].phone}</th>
                </tr>
            </table>
        </div>
        <div class="skillset">
            <h2>Skillset</h2>
            <table>
                ${skillsHtml}
            </table>
        </div>
        <div class="covid-sit">
            <h2>Covid Situation</h2>
            <form action="" class="covid-info f-s-16">
                <div>
                    <p>How would you prefer to work?</p>
                    <div>
                    ${applicationsList[i].work_preference}
                    </div>
                </div>
                <div>
                    <p>Did you have covid 19?</p>
                    <div>
                    ${applicationsList[i].had_covid}
                    </div>
                </div>
                <div>
                    <p>When did you have covid 19?</p>
                    <div>
                    ${applicationsList[i].had_covid_at}
                    </div>
                </div>
                <div>
                    <p>Have you been vaccinated?</p>
                    <div>
                    ${applicationsList[i].vaccinated}
                    </div>
                </div>
                <div>
                    <p>When did you get covid vaccine?</p>
                    <div>
                    ${applicationsList[i].vaccinated_at}
                    </div>
                </div>
            </form>
        </div>
        <div class="insights">
            <h2>Insights</h2>
            <form action="" class="covid-info f-s-16">
                <div>
                    <p>Would you attend Devtalks and maybe also organize your own?</p>
                    <div>
                    ${applicationsList[i].will_organize_devtalk}
                    </div>
                </div>
                <div>
                    <p>What would you speak about at Devtalk?</p>
                    <div>
                    ${applicationsList[i].devtalk_topic}
                    </div>
                </div>
                <div>
                    <p>Tell us somthing special</p>
                    <div>
                    ${applicationsList[i].something_special}
                    </div>
                </div>
            </form>
        </div>
    </div>`;
    }

    document.getElementById("subm-ltr").innerHTML = htmlText;
}