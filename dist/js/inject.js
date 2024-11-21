(function() {

    function findReactComponent(dom) {
        // Traverse DOM to find React component using __reactInternalInstance
        for (let key in dom) {
            console.log(key);
            if (key.startsWith("__reactFiber")) {
                console.log("hi")
                return dom[key].return;
            }
        }
        return null;
    }

    // Function to modify a React component's state or props directly
    const modifyReactComponent = (selector, newState) => {
        const element = document.querySelector(selector);
        console.log(element)
        const component = findReactComponent(element);

        if (component) {
            // Modify component state
            console.log(component);
            component.memoizedState = { ...component.memoizedState, ...newState };
            element.forceUpdate(); // Force update to apply changes
        } else {
            console.error("React component not found for the given selector:", selector);
        }
    };

    // Retrieve selector and new state from localStorage
    const selector = localStorage.getItem('reactComponentSelector');
    const newStateString = localStorage.getItem('reactComponentNewState');
    
    // Parse newState from string to object
    let newState = {};
    try {
        newState = JSON.parse(newStateString);
    } catch (e) {
        console.error("Failed to parse newState from localStorage:", e);
    }

    // Modify the React component if both values are available
    if (selector && newState) {
        modifyReactComponent(selector, newState);
    } else {
        console.error("Selector or newState not found in localStorage.");
    }
})();
