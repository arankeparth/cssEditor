window.addEventListener('load', function () {
  // content.js

  const styleSheet = document.createElement("style");
  document.head.appendChild(styleSheet);

  var toolbarvisible = false

  let selectedElement = null;

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateStyle") {
      // Assuming the selected element is stored globally or found by a selector
      if (selectedElement) {
        // Apply each style received in the message
        const styles = message.styles;
        Object.keys(styles).forEach((key) => {
          selectedElement.style[key] = styles[key];
        });
        sendResponse({ status: "success", message: "Styles updated!" });
      } else {
        sendResponse({ status: "error", message: "Element not found!" });
      }
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateStyleAll") {
      const styleString = message.styles; // Assuming the style string is passed in message.style
      console.log(styleString)
      // Check if the style string is valid and not empty
      if (styleString && typeof styleString === "string") {
        // Create a new style element
        const styleElement = document.createElement("style");

        // Set the innerHTML of the style element to the received CSS string
        styleElement.innerHTML = styleString;

        // Append the style element to the document's head
        document.head.appendChild(styleElement);

        selectedElement.classList.remove('loaded'); // Reset the animation
        setTimeout(() => {
          selectedElement.classList.add('loaded'); // Trigger the animation again
        }, 100);


        // Optionally send a response back to the sender
        sendResponse({ status: "Style updated successfully" });

      } else {
        sendResponse({ status: "Invalid style string" });
      }
    }
  });

  function injectCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // Function to add the HTML to the DOM
  function injectHTML(html, targetElement) {

    if (targetElement) {
      targetElement.insertAdjacentHTML('beforeend', html); // Append the HTML as the last child
    } else {
      console.error(`Target element not found: ${targetSelector}`);
    }
  }

  // Listen for messages from the background or popup script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "injectData") {
      const { html, css, js } = message.data;

      // Inject the CSS
      injectCSS(css);

      // Inject the HTML
      injectHTML(html, selectedElement);
      console.log("injecting")

      // Optional: Process JavaScript (if any)
      if (js) {
        const scriptElement = document.createElement("script");
        scriptElement.src = 'data:text/javascript;base64, ' + btoa(js); // Encode JavaScript in base64
      document.head.appendChild(scriptElement);
      }


      sendResponse({ success: true, message: "Data injected successfully" });
    }
  });


  const elementStyles = {};
  let selectedItems = [];
  const style = document.createElement("style");
  style.innerHTML =
    `.resize-handle {
        border-radius: 50%;
        background-color: blue;
        width: 10px;
        height: 10px;
        cursor: nwse-resize;
    }
  ;`
  document.head.appendChild(style);

  function disableAllButtonClicks() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
      button.onclick = null;
      button.disabled = true;
    });
  }


  disableAllButtonClicks();


  document.addEventListener('click', function (event) {
    //event.preventDefault();



    console.log(elementStyles);

    let prevElement = selectedElement;

    // if (prevElement && !prevElement.contains(event.target)) {
    //   deselectElement(prevElement);
    // }

    selectedElement = event.target;
    // if (selectedElement.className === "prompt-input" || selectedElement.className === "child-input" || selectedElement.className === "toolbar") {
    //     selectedElement = prevElement;
    //     console.log("this is a toolbar")
    //     return;
    // }

    event.preventDefault()

    for (let i = 0; i < selectedItems.length; i++) {
      const item = selectedItems[i];
      item.ele.style.outline = item.original_outline;
    }

    selectedItems = [
      {
        ele: selectedElement,
        original_outline: selectedElement.style.outline,
      },
    ];

    document.querySelectorAll(".resize-handle").forEach((handle) => handle.remove());
    if (toolbarvisible) {
      toolbarvisible = false
      return
    }

    toolbarvisible = true



    var defaultsStyles = window.getComputedStyle(selectedElement, null);

    var computed = ""

    for (var j = 0, maxj = defaultsStyles.length; j < maxj; j++) {
      var defaultStyle = defaultsStyles[j] + ": " + defaultsStyles.getPropertyValue("" + defaultsStyles[j]) + ";"
      computed += defaultStyle
    }





    if (!selectedElement.id || selectedElement.id === "") {
      selectedElement.id = generateRandomClassName()
    }

    chrome.runtime.sendMessage({
      action: "setSelected", payload: {
        tagName: selectedElement.tagName,
        innerHTML: selectedElement.innerHTML,
        outerHTML: selectedElement.outerHTML,
        textContent: selectedElement.textContent,
        styles: computed, // Inline styles
        attributes: Array.from(selectedElement.attributes).map(attr => ({
          name: attr.name,
          value: attr.value
        })),
        class: selectedElement.className,
        id: selectedElement.id
      }
    });
    selectedElement.style.outline = selectedElement.style.outline + " " + "2px solid blue";



    // Create a new resize handle at the bottom-right corner
    const resizeHandle = document.createElement("div");
    resizeHandle.className = "resize-handle";
    resizeHandle.style.width = "10px";
    resizeHandle.style.height = "10px";
    resizeHandle.style.backgroundColor = "blue";
    resizeHandle.style.position = "absolute";
    resizeHandle.style.cursor = "nwse-resize";
    resizeHandle.style.zIndex = "1000";

    // Position the resize handle
    positionHandle(resizeHandle, selectedElement);
    document.body.appendChild(resizeHandle);

    // Variables for resizing
    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    resizeHandle.addEventListener("mousedown", function (e) {
      e.preventDefault();
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = selectedElement.offsetWidth;
      startHeight = selectedElement.offsetHeight;

      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResize);
    });


    function resize(e) {
      if (isResizing) {
        const newWidth = startWidth + (e.clientX - startX);
        const newHeight = startHeight + (e.clientY - startY);
        selectedElement.style.width = `${newWidth}px`;
        selectedElement.style.height = `${newHeight}px`;

        positionHandle(resizeHandle, selectedElement);
        updateElementStyles(selectedElement, { width: newWidth, height: newHeight });
      }
    }

    function stopResize() {
      isResizing = false;
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResize);
    }

    function positionHandle(handle, element) {
      const rect = element.getBoundingClientRect();
      // Adjust handle position to account for scroll offset
      handle.style.top = `${rect.bottom + window.scrollY - 5}px`;
      handle.style.left = `${rect.right + window.scrollX - 5}px`;
    }

    function updateElementStyles(element, style) {
      if (element.id) {
        elementStyles['#' + element.id] = { ...elementStyles["#" + element.id], ...style };
      } else {
        const id = generateRandomClassName();
        elementStyles["#" + id] = { ...elementStyles["#" + element.id], ...style };
        element.id = id;
      }
      updateStyleSheet();
    }

    function generateRandomClassName() {
      const className = Math.random().toString(36).substring(2, 10);
      return className;
    }

    function updateStyleSheet() {
      //      for (const [className, styles] of Object.entries(elementStyles)) {
      //        ${className} {
      //            width: ${styles.width}px;
      //            height: ${styles.height}px;
      //        }
      //    `;
      //      }
    }
  })
});
