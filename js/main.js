'use strict';

// *********************************************
// Setting Variables:
// *********************************************
let contacts = [];
let showContent = document.getElementsByClassName('contact');
let infoPopup = document.getElementsByClassName('getInfoPopup');
let container = document.querySelector('.container');
let pOfInfoPopup = document.querySelectorAll('.getInfoPopup > p');
let updatePopup = document.querySelectorAll('.updatePopup > *');
let addPopup = document.querySelectorAll('.addPopup > *');
let edit = document.querySelector('.updatePopup > .edit');
let exit = document.querySelector('.exit');
let cancelUpdate = document.querySelector('.cancelUpdate');
let cancelAdd = document.querySelector('.cancelAdd');
let deleteAll = document.querySelector('.deleteAll');
let addContact = document.querySelector('.addImg');
let addButton = document.querySelector('.add');
let search = document.querySelector('.search');
let searchText = document.querySelector('.searchInput');
let myClick = document.querySelector('.click');
let index = -1;

// *********************************************
// Setting a default contacts:
// *********************************************
contacts[0] = {
  name: 'Ezra',
  phoneNumber: '050-9906313',
  address: 'Harav Vainrov 24, Tirat Carmel',
  email: 'ezrachayu@gmail.com',
  note: 'I am ezra chayu',
};

contacts[1] = {
  name: 'Hodaya',
  phoneNumber: '053-6246429',
  address: 'Harav Vainrov 24, Tirat Carmel',
  email: 'hodayachao@gmail.com',
  note: 'I am hodaya chayo',
};

contacts[2] = {
  name: 'Dad',
  phoneNumber: '053-2235365',
  address: 'Harav Vainrov 24, Tirat Carmel',
  email: 'yehoshua@gmail.com',
  note: null,
};

contacts[3] = {
  name: 'Mom',
  phoneNumber: '050-9571465',
  address: 'Harav Vainrov 24, Tirat Carmel',
  email: 'vered@gmail.com',
  note: null,
};

const newDefult = {
  name: null,
  phoneNumber: null,
  address: null,
  email: null,
  note: null,
};

const stringOfAddcontact = `<div class="contact">
  <p class="name"></p>
  <p class="number"></p>
  <img class="editImg" src="images/edit.png" alt="edit" height="22" width="22">
  <img class="deleteImg" src="images/delete.png" alt="delete" height="22" width="22">
</div>`;

// *********************************************
// Functions:
// *********************************************

// Updateing the contacts view list
const updateContactView = () => {
  for (let i = 0; i < showContent.length; i++) {
    showContent[i].childNodes[1].textContent = contacts[i].name;
    showContent[i].childNodes[3].textContent = contacts[i].phoneNumber;
  }
};

// Change color with hover on each contact
const hoverOnContacts = () => {
  for (let contact of showContent) {
    contact.addEventListener('mouseover', function MouseOver() {
      contact.style.backgroundColor = 'hsl(180, 100%, 88%)';
    });

    contact.addEventListener('mouseout', function MouseOut() {
      contact.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    });
  }
};

// sort by name
const sortContectByName = () => {
  contacts.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
  updateContactView();
};

// Find index by name
const indexByName = findName => {
  return contacts.findIndex(el => el.name === findName);
};

// Set InfoPopup to contact values by index
const setInfoPopup = index => {
  for (let el of pOfInfoPopup) {
    el.textContent = '';
  }
  pOfInfoPopup[0].textContent = `Name: ${contacts[index].name}`;
  pOfInfoPopup[1].textContent = `Phone Number: ${contacts[index].phoneNumber}`;
  if (contacts[index].address !== null && contacts[index].address !== '')
    pOfInfoPopup[2].textContent = `Address: ${contacts[index].address}`;

  if (contacts[index].email !== null && contacts[index].email !== '')
    pOfInfoPopup[3].textContent = `Email: ${contacts[index].email}`;

  if (contacts[index].note !== null && contacts[index].note !== '')
    pOfInfoPopup[4].textContent = `Note: ${contacts[index].note}`;
};

// Show Infopopup of selected contact
const showInfopopup = () => {
  exit.addEventListener('click', function () {
    document.querySelector('.getInfoPopup').style.display = 'none';
  });

  container.addEventListener('click', function (el) {
    // console.log(el);
    if (
      el.target.className !== 'options' &&
      el.target.parentElement.className !== 'options'
    ) {
      let indexForInfo = indexByName(el.target.innerText);
      // console.log(index)
      if (indexForInfo === -1) {
        indexForInfo = indexByName(el.target.previousElementSibling.innerText);
        // console.log(index);
      }
      if (indexForInfo !== -1) {
        setInfoPopup(indexForInfo);
        document.querySelector('.getInfoPopup').style.display = 'flex';
      }
    }
  });
};

// Edit button - update data in contants array
edit.addEventListener('click', function () {
  // debugger;
  if (
    updatePopup[0].value === contacts[index].name ||
    indexByName(updatePopup[0].value) === -1
  ) {
    console.log(index);
    console.log(contacts[index].name);
    contacts[index].name = updatePopup[0].value;
    contacts[index].phoneNumber = updatePopup[1].value;
    contacts[index].address = updatePopup[2].value;
    contacts[index].email = updatePopup[3].value;
    contacts[index].note = updatePopup[4].value;
    document.querySelector('.updatePopup').style.display = 'none';
    console.dir(contacts);
    sortContectByName();
  } else {
    alert('Name contact allredy exist!');
    console.log('problams');
    console.log(updatePopup[0].value == contacts[index].name);
    console.log(indexByName(updatePopup[0].value) == -1);
  }
});

// const editContact = index => {
//   console.log(index);
//   // let myIndex = index;
//   // console.log(myIndex)
// };

// Edit contact popup
const editContactPopup = () => {
  cancelUpdate.addEventListener('click', function () {
    document.querySelector('.updatePopup').style.display = 'none';
  });

  container.addEventListener('click', function (el) {
    // debugger;
    // console.log(el);
    if (el.target.className === 'editImg') {
      index = indexByName(el.target.parentNode.firstElementChild.innerText);
      console.log(index);
      updatePopup[0].value = contacts[index].name;
      updatePopup[1].value = contacts[index].phoneNumber;
      updatePopup[2].value = contacts[index].address;
      updatePopup[3].value = contacts[index].email;
      updatePopup[4].value = contacts[index].note;
      document.querySelector('.updatePopup').style.display = 'flex';
      // editContact(index);
    }
  });
};

// Delete one contact
const deleteOneContect = () => {
  container.addEventListener('click', function (el) {
    if (el.target.className === 'deleteImg') {
      let indexToDelete;
      indexToDelete = indexByName(
        el.target.parentNode.firstElementChild.innerText
      );
      contacts.splice(indexToDelete, 1);
      showContent[showContent.length - 1].remove();
      sortContectByName();
      if (showContent.length === 0) {
        const noContact = document.createElement('p');
        noContact.innerHTML = 'Contacts list is Empty, try to add contacts.';
        document.querySelector('.container').appendChild(noContact);
      }
    }
  });
};

// Delete All contacts
const deleteAllContacts = () => {
  deleteAll.addEventListener('click', function () {
    contacts.splice(0);
    document.querySelectorAll('.contact').forEach(element => {
      element.remove();
    });
    if (showContent.length === 0) {
      const noContact = document.createElement('p');
      noContact.innerHTML = 'Contacts list is Empty, try to add contacts.';
      document.querySelector('.container').appendChild(noContact);
    }
  });
};

// Chack phon number input
const chackPhoneNumber = formString => {
  let flagToReturn = true;

  flagToReturn = formString.length >= 10 && formString.length <= 11;
  if (flagToReturn) {
    for (let i = 0; i < formString.length && flagToReturn; i++) {
      flagToReturn =
        (formString[i] >= '0' && formString[i] <= '9') || formString[i] === '-';
    }
  }
  return flagToReturn;
};

// Add defult cell to contacts array and div to the HTML
const addNewValue = () => {
  if (showContent.length === 0) {
    document.querySelector('.container > p').remove();
  }

  contacts.push(newDefult);

  document
    .querySelector('.container')
    .insertAdjacentHTML('beforeend', stringOfAddcontact);

  // Add the hover efect
  showContent[showContent.length - 1].addEventListener(
    'mouseover',
    function MouseOver() {
      showContent[showContent.length - 1].style.backgroundColor =
        'hsl(180, 100%, 88%)';
    }
  );

  showContent[showContent.length - 1].addEventListener(
    'mouseout',
    function MouseOut() {
      showContent[showContent.length - 1].style.backgroundColor =
        'rgba(255, 255, 255, 0)';
    }
  );
};

//Add new contact, chack inputs and alerts for problamse
const addNewContact = () => {
  cancelAdd.addEventListener('click', function () {
    document.querySelector('.addPopup').style.display = 'none';
  });

  addContact.addEventListener('click', function () {
    for (let i = 0; i < 5; i++) {
      addPopup[i].value = '';
    }
    document.querySelector('.addPopup').style.display = 'flex';

    addButton.addEventListener('click', function () {
      if (
        addPopup[0].value != '' &&
        addPopup[1].value != '' &&
        indexByName(addPopup[0].value) === -1 &&
        chackPhoneNumber(addPopup[1].value)
      ) {
        addNewValue();
        contacts[contacts.length - 1].name = addPopup[0].value;
        contacts[contacts.length - 1].phoneNumber = addPopup[1].value;
        contacts[contacts.length - 1].address = addPopup[2].value;
        contacts[contacts.length - 1].email = addPopup[3].value;
        contacts[contacts.length - 1].note = addPopup[4].value;
        sortContectByName();
        document.querySelector('.addPopup').style.display = 'none';
      } else {
        if (addPopup[0].value === '') alert('Name is empty!');
        if (addPopup[1].value === '') alert('Phone number is empty!');
        if (indexByName(addPopup[0]) != -1) alert('Name allredy exist!');
        if (chackPhoneNumber(addPopup[1].value) === false)
          alert('Phone number must contain 10 numbers and "-" is optional');
      }
    });
  });
};

// Search name contacts, not case sensitive
const searchName = () => {
  searchText.addEventListener('input', function () {
    for (let el of showContent) {
      if (
        el.childNodes[1].innerText
          .toLowerCase()
          .includes(searchText.value.toLowerCase()) === false
      ) {
        el.style.display = 'none';
      } else el.style.display = 'grid';
    }
  });
};

const boom = () => {
  let flag = false;
  myClick.addEventListener('click', function () {
    console.log('work');
    if (flag) {
      document.querySelector('.boom').style.display = 'none';
      flag = !flag;
    } else {
      document.querySelector('.boom').style.display = 'block';
      flag = !flag;
    }
  });
};

// *********************************************
// Code:
// *********************************************

updateContactView();
hoverOnContacts();
sortContectByName();
showInfopopup();
editContactPopup();
deleteOneContect();
deleteAllContacts();
addNewContact();
searchName();
boom();
