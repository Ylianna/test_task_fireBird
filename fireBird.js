let usersData;
let infoModal;
let temp = "";

function ajaxJS() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            usersData = users;
            document.getElementById("data").innerText = "";

            users.forEach((data) => {
                temp += `<tr id="${data.id}">`;
                temp += "<td>" + `<button onclick="removeUser(${data.id})" class="removeUser">Delete</button>` + "</td>";
                temp += "<td>" + `<a onclick="openInfoModal(${data.id})"  class="clickUser">` + `<span class='name' data-value='${data.name}'>` + data.name + `</span>` + "</a>" + "</td>";
                temp += "<td>" + `<span class='userName' data-value='${data.username}'>` + data.username + `</span>` + "</td>";
                temp += "<td>" + `<span class='userEmail' data-value='${data.email}'>` + data.email + `</span>` + "</td>";
                temp += "</tr>"
            });

            document.getElementById("data").innerHTML += temp;
        })
}

function removeUser(userId) {
    document.getElementById(userId).remove();
}

function openInfoModal(userId) {
    infoModal.style.display = "flex";
    let companyUser = document.getElementById("company");
    let addressUser = document.getElementById("address");

    const userInfo = usersData.find(user => user.id === userId);
    companyUser.innerText = "Company: " + userInfo.company.name;
    addressUser.innerText = "Address: " + userInfo.address.city + ',' + ' ' + "St. " + userInfo.address.street + ' ' + userInfo.address.suite;

}

function closeInfoModal() {
    infoModal.style.display = "none";
}

function highlightParams() {
    const searchString = document.getElementById("search").value;
    ['userEmail', 'userName', 'name'].forEach(nodeClass => {
        const nodes = document.getElementsByClassName(nodeClass);
        const nodesArray = Array.from(nodes);
        nodesArray.forEach(email => email.innerHTML = email.getAttribute('data-value'));
        const filteredNodes = nodesArray.filter(email => email.getAttribute('data-value').toLowerCase().includes(searchString.toLowerCase()));

        for (let email of filteredNodes) {
            const content = email.getAttribute('data-value');
            email.innerHTML = content.replace(new RegExp(searchString, 'gi'), str => `<span class='highlight'>${str}</span>`);
        }
    })
}

function resetSets() {
    let searchString = document.getElementById("search");
    searchString.value = "";
    temp = "";
    ajaxJS();
}

window.onload = function () {
    infoModal = document.getElementById("infoModal");
    ajaxJS();

    document.getElementById("search").onkeyup = function () {
        highlightParams();
    };
}

