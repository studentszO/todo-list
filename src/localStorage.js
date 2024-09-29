import { taskFactory } from "./tasks";

export function saveObjectToLocalStorage() {
    const setCategoriesListObjectToJSON = JSON.stringify(taskFactory.categoryList);
    const setInboxTasksListObjectToJSON = JSON.stringify(taskFactory.inboxTasks);

    localStorage.setItem("inbox", setInboxTasksListObjectToJSON);
    localStorage.setItem("categories", setCategoriesListObjectToJSON);
};

export function loadOBjectFromLocalStorage() {
    if (storageAvailable("localStorage")) {
        if (localStorage.length > 0) {
            const categoriesList = JSON.parse(localStorage.getItem("categories"));
            const inboxList = JSON.parse(localStorage.getItem("inbox"));
            return [categoriesList, inboxList];
          } 
        else {
            return false;
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
