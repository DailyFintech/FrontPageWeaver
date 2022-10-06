/* global chrome */

try {
  chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, { message: 'load' });
  });
} catch (error) {
  console.log({error});  
}



// chrome.storage.onChanged.addListener(function(changes, namespace) {
//   for (var key in changes) {
//     var storageChange = changes[key];
//     console.log('Storage key "%s" in namespace "%s" changed. ' +
//                 'Old value was "%s", new value is "%s".',
//                 key,
//                 namespace,
//                 storageChange.oldValue,
//                 storageChange.newValue);
//   }
// });

// chrome.runtime.getBackgroundPage(function(bgPage){
//   bgPage.performFirebaseLoginWithEmailAndPassword(email,password);
// });
