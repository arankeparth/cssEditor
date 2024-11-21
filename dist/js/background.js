// Assuming you have a button in your popup

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "setSelected") {
      // Store the payload in Chrome local storage
      console.log(message.payload)
      chrome.storage.local.set({ selectedData: message.payload }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error storing data:", chrome.runtime.lastError);
        } else {
          console.log("Data stored successfully:", message.payload);
          chrome.action.openPopup();
          sendResponse({ status: "success" });
        }
      });
  
      // Indicate that the response will be sent asynchronously
      return true;
    }
    if (message.action === "getSelected") {
        // Retrieve the stored data
        chrome.storage.local.get("selectedData", (result) => {
          if (chrome.runtime.lastError) {
            console.error("Error retrieving data:", chrome.runtime.lastError);
            sendResponse({ status: "error", error: chrome.runtime.lastError });
          } else if (result.selectedData) {
            console.log("Retrieved data:", result.selectedData);
            sendResponse({ status: "success", data: result.selectedData });
          } else {
            console.log("No data found.");
            sendResponse({ status: "not_found" });
          }
        });
    
        // Indicate that the response will be sent asynchronously
        return true;
      }
  });

// const button = document.querySelector('button');
// button.addEventListener('click', () => {
//     const selector = '.header'; // The selector for your React component
//     const newState = { color: 'white' }; // The new state you want to set
  
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.tabs.sendMessage(tabs[0].id, {
//             action: "modifyComponent",
//             selector,
//             newState
//         });
//     });
//   });
