export {}

const storageList:string[] = [];

chrome.storage.onChanged.addListener(function storageUpdateHandler(changes, areaName){
  if (areaName !== 'local') return;
  init();
})

init();

async function init() {
  const list = await loadListFromStorage();
  console.log('DGTM. content loaded.', list);

  resetMemoryList(list);
}

function resetMemoryList(newList:string[]|undefined) {
  if(newList === undefined) return;
  storageList.length = 0;
  storageList.push(...newList);
}

function loadListFromStorage() {
  return new Promise((resolve: (val: string[]) => void)  =>{
      chrome.storage.local.get('list', (result:LocalStorageData)=>{
          resolve(JSON.parse(result.list!))
      })
  }) 
}

function handleList() {
  storageList.forEach(item =>{
    
  })
}