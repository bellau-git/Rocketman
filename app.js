var userData = {
    token: '143e38b3-b99a-4059-8f83-1fdbff6cc44b',
    first_name: 'aa',
    last_name: 'aa',
    email: 'aa@dd.com',
    phone: '+995556603333',
    skills: [{
        id: 1,
        title: 'PHP',
        experience: 3
    }],
    "work_preference": "from_home",
    "had_covid": true,
    "had_covid_at": "2022-02-23",
    "vaccinated": true,
    "vaccinated_at": "2022-02-23",
    "will_organize_devtalk": true,
    "devtalk_topic": "I would ...",
    "something_special": "I am special!"
};

var userDat11a = {
    token: '143e38b3-b99a-4059-8f83-1fdbff6cc44b',
    "first_name": "gela",
    "last_name": "gelashvili",
    "email": "gelashvili@gela.ge",
    "phone": "+995591933382",
    "skills": [
        {
            "id": 1,
            "experience": 3
        }
    ],
    "work_preference": "from_home",
    "had_covid": true,
    "had_covid_at": "2022-02-23",
    "vaccinated": true,
    "vaccinated_at": "2022-02-23",
    "will_organize_devtalk": true,
    "devtalk_topic": "I would ...",
    "something_special": "I am special!"
};
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
        currentPage = currentPage + 1;
    } else {
        currentPage = 0;
    }
    showContainer(formPages[currentPage]);
}

document.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        nextPage();
    } else if (event.keyCode === 8) {
        prevPage();
    }
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
        alert(status);
        if (status === 201) {
            localStorage.removeItem('userDataStorage');
            nextPage();
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
        <i class="fa-solid fa-circle-minus" onclick="removeSkill(${i})"></i>
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
            id: skillSelect.value,
            title: skillSelect.options[skillSelect.selectedIndex].text,
            experience: document.getElementById("experience").value
        })
    }
    refreshSkills(userData.skills);
}