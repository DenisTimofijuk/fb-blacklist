export {}
const button_add = document.getElementById('add-record') as HTMLButtonElement;
const nameInput = document.getElementById('name') as HTMLInputElement;

button_add.addEventListener('click', saveRecord);

const storageList:string[] = [];

init();

function saveRecord() {
    if(!nameInput.value) return;

    storageList.push(nameInput.value);
    saveListToStorage();
    nameInput.value = '';
}


function loadListFromStorage() {
    return new Promise((resolve: (val: string[]) => void)  =>{
        chrome.storage.local.get('list', (result:LocalStorageData)=>{
            resolve(JSON.parse(result.list!))
        })
    }) 
}

async function init() {
    const list = await loadListFromStorage();
    resetMemoryList(list);
    displayList();
}

function resetMemoryList(newList:string[]|undefined) {
    if(newList === undefined) return;
    storageList.length = 0;
    storageList.push(...newList);
}

function displayList() {
    const placeHolder = document.getElementById('list-holder')!;
    placeHolder.innerHTML = '';
    storageList.forEach((listItems, index) => {
        placeHolder.append(createListRow(listItems, index));
    });
}

function createListRow(label: string, index: number) {
    const wrapper = document.createElement('div');
    wrapper.className = 'list-item';

    const button = document.createElement('input');
    button.type = 'button';
    button.value = 'X';
    button.className = 'btn-remove';
    button.addEventListener('click', () => removeItemFromList(index));

    const link = document.createElement('span');
    link.innerText = label;
    link.classList.add('clicable-item');

    wrapper.appendChild(link);
    wrapper.appendChild(button);

    return wrapper;
}

function removeItemFromList(index: number) {
    storageList.splice(index, 1);
    saveListToStorage();
}

function saveListToStorage() {
    const dataToSave = JSON.stringify(storageList);
    chrome.storage.local.set(<LocalStorageData>{ ['list']: dataToSave });
    displayList()
}