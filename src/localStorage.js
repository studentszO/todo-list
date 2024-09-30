import toDoList from "./tasks";

export function saveObjectToLocalStorage() {
    const setCategoriesListObjectToJSON = JSON.stringify(toDoList.categoryList);
    const setInboxTasksListObjectToJSON = JSON.stringify(toDoList.inboxTasks);

    localStorage.setItem("inbox", setInboxTasksListObjectToJSON);
    localStorage.setItem("categories", setCategoriesListObjectToJSON);
};

export function loadOBjectFromLocalStorage() {
    if (storageAvailable("localStorage")) {
        if (!localStorage.getItem("categories")) {
            return false;
          } 
        else {
            const categoriesList = JSON.parse(localStorage.getItem("categories"));
            const inboxList = JSON.parse(localStorage.getItem("inbox"));
            return [categoriesList, inboxList];
          }
    }
};

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  };
