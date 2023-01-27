export {}

const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');
const css = `
  .dgtm-blacklist-name { color: #BC2C19 !important; } 
  .dgtm-blacklist-content { background: #F1A399 !important; }
  `;
head.appendChild(style);
style.appendChild(document.createTextNode(css));


const storageList:string[] = [];

chrome.storage.onChanged.addListener(function storageUpdateHandler(changes, areaName){
  if (areaName !== 'local') return;
  resetSearch();
  resetHighlights();
  init();
})

init();

let isScrolling:any;
window.addEventListener('scroll', function ( event ) {
	window.clearTimeout( isScrolling );
	isScrolling = setTimeout(function() {
		handleList();
	}, 66);
}, false);


async function init() {
  const list = await loadListFromStorage();
  console.log('DGTM. content loaded.', list);

  resetMemoryList(list);
  handleList();
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
  let counter = 0;
  collectPageItems().forEach((nodeElement)=>{
    for(let childNode of nodeElement.childNodes){
      if(childNode.nodeType == Node.TEXT_NODE){
        if(childNode.textContent && storageList.indexOf(childNode.textContent) > -1){
          nodeElement.classList.add('dgtm-blacklist-name');
          nodeElement.closest('div.x1y1aw1k.xn6708d.xwib8y2.x1ye3gou')?.classList.add('dgtm-blacklist-content');
          nodeElement.closest('div.x78zum5.xdt5ytf.xz62fqu.x16ldp7u')?.classList.add('dgtm-blacklist-content');
          break;
        }
      }
    };
    nodeElement.classList.add('dgtm-checked');
    counter ++;
  });

  console.log('Checket Items:', counter);
}

function collectPageItems() {
  const collection = document.querySelectorAll('.xzsf02u.x1s688f:not(.dgtm-checked)');

  console.log('Colected Items:', collection.length);
  return collection
}

function resetSearch() {
  document.querySelectorAll('.dgtm-checked').forEach(el => el.classList.remove('dgtm-checked'));
}
function resetHighlights() {
  document.querySelectorAll('.dgtm-blacklist-name').forEach(el => el.classList.remove('dgtm-blacklist-name'));
  document.querySelectorAll('.dgtm-blacklist-content').forEach(el => el.classList.remove('dgtm-blacklist-content'));
}