let AccountControler = (() => {
  const Account = function(id, bank, accName, accNumber) {
    this.bank = bank;
    this.accName = accName;
    this.accNumber = accNumber;
    this.id = id;
  };

  const User = function(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  };

  data = {
    accounts: [
      {
        id: 0,
        bank: "access",
        accName: "Whyte Peter",
        accNumber: "0805915972"
      },
      {
        id: 1,
        bank: "gtb",
        accName: "Emmanuel Whyte Peter",
        accNumber: "0429832896"
      },
      {
        id: 2,
        bank: "zenith",
        accName: "Peter Emmanuel",
        accNumber: "2121430638"
      }
    ],
    users: []
  };

  return {
    addAccount: (bank, accName, accNumber) => {
      let newAccount, ID;

      //create new ID
      if (data.accounts.length > 0) {
        ID = data.accounts[data.accounts.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new account
      newAccount = new Account(ID, bank, accName, accNumber);

      // push new account to data structure
      data.accounts.push(newAccount);

      // return the new Account
      return newAccount;
    },

    // function sort

    sortAcc: sortby => {
      let sortAct = data.accounts;
      sortAct.sort((a, b) => {
        nameA = a[sortby].toLowerCase();
        nameB = b[sortby].toLowerCase();
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });

      return sortAct;
    },

    // function to delete account  not ready yet
    deleteAccount: delID => {
      let delAcc = data.accounts;

      delAcc.forEach(acc => {
        if (delID.endsWith(acc.id.toString())) {
          delAcc.pop(acc);
        }
      });
    },
    test: () => {
      AccountControler.deleteAccount("delete-0");
    }
  };
})();

// UI Controller
let UIControler = (() => {
  let DOMstrings;

  DOMstrings = {
    menuBtn: ".menu-btn",
    navDrawer: ".navigation-drawer",
    overlay: ".overlay",
    sortActive: ".active",
    sortSelect: ".sort-select",
    sortOptions: ".sort-options",
    searchBox: ".main__filter--search",
    searchToggle: ".sort-search-icon",
    searchField: ".search-field",
    searchIcon: ".search-icon",
    searchResultBox: ".main__search-result",
    searchResult: ".search-result-list",
    mainList: ".list",
    accItems: ".main__list-items",
    deleteBtn: ".main__list-items-delete",
    addBtn: ".add-btn",
    form: ".form",
    accItemsAct: ".main__list-items-acc",
    formContainer: ".form-container",
    closeForm: ".close",
    selectBank: ".selected",
    selectOption: ".option-container",
    bankList: ".option",
    bankImage: ".bank",
    accName: ".act-name",
    accNumber: ".act-number",
    dSortBtn: ".sort",
    mSortBtn: ".m-sort"
  };

  return {
    getDOMstrings: () => {
      return DOMstrings;
    },

    removeAccount: () => {
      let list = document.querySelector(DOMstrings.mainList);
      list.innerHTML = "";
    },

    addAccountList: obj => {
      let html, newHtml, element;

      // create HTML string with placeholder text %id%, %bank%, %accName%, %accNumber%
      html =
        '<li id="account-%id%" class="main__list-items"><div class="main__list-items-bank"><img src="./assets/%bank%.png" alt="%bank% bank logo"></div><div class="main__list-items-acc"><div class="main__list-items-acc-name">%accName%</div><div class="main__list-items-acc-number">%accNumber%</div></div><span  class="main__list-items-delete delete"><i id="delete-%-id%" class="fas fa-trash"></i></span></li>';
      element = DOMstrings.mainList;
      // Replace placeholder text with actual text
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%-id%", obj.id);
      newHtml = newHtml.replace("%bank%", obj.bank);
      newHtml = newHtml.replace("%accName%", obj.accName);
      newHtml = newHtml.replace("%accNumber%", obj.accNumber);

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    displaySearchResultBox: e => {
      console.log("hello");

      if (e > 0) {
        document
          .querySelector(DOMstrings.searchResultBox)
          .classList.add("open");
      } else {
        document
          .querySelector(DOMstrings.searchResultBox)
          .classList.remove("open");
      }
    },
    getInput: () => {
      return {
        // why is that it giving me undefined....F**K
        bank: document.querySelector(DOMstrings.bankImage).id,
        actName: document.querySelector(DOMstrings.accName).value,
        actNumber: parseInt(document.querySelector(DOMstrings.accNumber)).value
      };
    },

    clearFields: () => {
      // clear the bank fields
      document.querySelector(DOMstrings.bankImage).src = "./assets/default.png";
      document.querySelector(DOMstrings.selectBank).innerHTML = "Select Bank";

      //clear name fields
      document.querySelector(DOMstrings.accName).value = "";
      //clear number fields
      document.querySelector(DOMstrings.accNumber).value = "";
    },
    test: () => {}
  };
})();

UIControler.test();

let controler = ((Actctrl, UIctrl) => {
  let DOM,
    sortActive,
    sortOptions,
    searchToggle,
    searchBox,
    searchField,
    searchIcon,
    searchResultBox,
    searchResult,
    mainList,
    deleteBtn,
    addBtn,
    form,
    accItems,
    accItemsAct,
    formContainer,
    overlay,
    navDrawer,
    closeForm,
    selectBank,
    selectOption,
    bankList,
    bankImage,
    inputBank,
    inputName,
    inputNumber,
    dSortBtn,
    mSortBtn;

  let setUpEventListeners = () => {
    //Navigation drawer function

    DOM = UIctrl.getDOMstrings();

    //add the nav drawer
    document.querySelector(DOM.menuBtn).addEventListener("click", () => {
      document.querySelector(DOM.navDrawer).classList.add("open");
      // adds the overlay with a fadeIn effect
      animated(overlay, "fadeIn", "on");
      overlay.classList.add("on");
    });

    //Remove the nav drawer
    overlay = document.querySelector(DOM.overlay);
    navDrawer = document.querySelector(DOM.navDrawer);

    overlay.addEventListener("click", () => {
      if (navDrawer.className.includes("open")) {
        //removes the overly with a fadeout effect
        animated(overlay, "fadeOut");
        overlay.classList.remove("on");
        navDrawer.classList.remove("open");
      } else {
        return false;
      }
    });

    //sort dropdown
    sortActive = document.querySelector(DOM.sortActive);
    sortSelect = document.querySelector(DOM.sortSelect);
    sortOptions = document.querySelectorAll(DOM.sortOptions);

    sortActive.addEventListener("click", () => {
      sortSelect.style.visibility = "visible";
    });

    // selecting an option
    Array.from(sortOptions).forEach(option => {
      option.addEventListener("click", e => {
        sortActive.innerHTML = e.target.id;
        sortSelect.style.visibility = "hidden";
      });
    });

    //display search on mobile
    searchBox = document.querySelector(DOM.searchBox);
    searchToggle = document.querySelector(DOM.searchToggle);
    mainList = document.querySelector(DOM.mainList);
    searchToggle.addEventListener("click", () => {
      animated(searchBox, "fadeInDown");
      AddRemoveClass(searchBox, "toggle", "open");

      // Adding top margin to .main_list section
      mainList.classList.toggle("mtop");
    });

    // search focus animation
    searchField = document.querySelector(DOM.searchField);
    searchField.addEventListener("focus", () => {
      AddRemoveClass(searchBox, "add", "focus");
    });
    searchField.addEventListener("focusout", () => {
      AddRemoveClass(searchBox, "remove", "focus");
    });

    searchIcon = document.querySelector(DOM.searchIcon);
    searchIcon.addEventListener("click", () => {
      AddRemoveClass(searchBox, "add", "focus");
    });

    //show delete button
    accItems = Array.from(document.querySelectorAll(DOM.accItems));
    deleteBtn = document.querySelector(DOM.deleteBtn);
    accItemsAct = Array.from(document.querySelectorAll(DOM.accItemsAct));

    accItemsAct.forEach(item => {
      item.addEventListener("long-press", e => {
        item.classList.toggle("mleft");
        deleteBtn.classList.toggle("open");
      });
    });

    //show form by click the add buttn
    addBtn = document.querySelector(DOM.addBtn);
    closeForm = document.querySelector(DOM.closeForm);
    formContainer = document.querySelector(DOM.formContainer);
    addBtn.addEventListener("click", () => {
      animated(overlay, "fadeIn");
      AddRemoveClass(overlay, "add", "on");
      AddRemoveClass(formContainer, "add", "open");
    });

    // close form
    closeForm.addEventListener("click", () => {
      animated(overlay, "fadeOut");
      AddRemoveClass(overlay, "remove", "on");
      AddRemoveClass(formContainer, "remove", "open");
    });

    //display bank in the form
    selectBank = document.querySelector(DOM.selectBank);
    selectOption = document.querySelector(DOM.selectOption);
    bankList = Array.from(document.querySelectorAll(DOM.bankList));
    bankImage = document.querySelector(DOM.bankImage);

    selectBank.addEventListener("click", () => {
      AddRemoveClass(selectOption, "toggle", "active");
    });
    bankList.forEach(bank => {
      bank.addEventListener("click", e => {
        selectBank.innerHTML = bank.querySelector("label").innerHTML;
        AddRemoveClass(selectOption, "remove", "active");

        //change the logo of the bank to the selected one
        bankImage.src = `./assets/${e.target.id}.png`;
        bankImage.id = e.target.id;
      });
    });

    // //testing out my new animtion function// This cpde will be removed
    // deleteBtn.addEventListener("click", () => {
    //   accItems.forEach(item => {
    //     animated(item, "fadeOutLeft");
    //     wait(item, "dnone");
    //   });
    // });

    //on form submit validation
    //get inputs
    inputBank = document.querySelector(DOM.bankImage);
    inputName = document.querySelector(DOM.accName);
    inputNumber = document.querySelector(DOM.accNumber);

    let input, newAccount;
    form = document.querySelector(DOM.form);
    input = UIctrl.getInput();

    form.addEventListener("submit", e => {
      e.preventDefault();
      console.log(inputNumber.value);
      // validate inputs
      if (ValidateField(inputBank, inputName, inputNumber)) {
        // add account to storaage
        newAccount = Actctrl.addAccount(
          inputBank.id,
          inputName.value,
          inputNumber.value
        );

        // update the ui
        UIctrl.addAccountList(newAccount);
        console.log(newAccount);
        console.log(newAccount.id);

        //clear fields
        UIctrl.clearFields();
      } else {
        return false;
      }
    });

    //Search function
    searchField = document.querySelector(DOM.searchField);
    searchField.addEventListener("keyup", e => {
      // Make the search Result box visible
      UIctrl.displaySearchResultBox(searchField.value.length);

      //Check if the input matches any Account
      //Display the Account
    });

    //Sort All Account Bank name
    dSortBtn = Array.from(document.querySelectorAll(DOM.dSortBtn));

    dSortBtn.forEach(btn => {
      btn.addEventListener("click", e => {
        console.log(e.target.id);
        // sort the accounts in the storage
        let newSortedAccs = Actctrl.sortAcc(e.target.id);

        // remove the acc o
        UIctrl.removeAccount();

        // update the UI with the sorted acc
        newSortedAccs.forEach(sortedAcc => {
          UIctrl.addAccountList(sortedAcc);
        });
      });
    });

    //Sort All Account Account name
    mSortBtn = Array.from(document.querySelectorAll(DOM.mSortBtn));
    mSortBtn.forEach(btn => {
      btn.addEventListener("click", e => {
        console.log(e.target.id);
        // sort the accounts in the storage
        let newSortedAccs = Actctrl.sortAcc(e.target.id);

        // remove the acc o
        UIctrl.removeAccount();

        // update the UI with the sorted acc
        newSortedAccs.forEach(sortedAcc => {
          UIctrl.addAccountList(sortedAcc);
        });
      });
    });
  };

  //Validation and Add account to list
  function ValidateField(bank, name, number) {
    if (bank.id === "default") {
      console.log(bank.id);
      alert("bank must not be empty");

      return false;
    } else if (name.value === "" || !isNaN(name.value)) {
      console.log(name.value);
      alert("invalid acc name");
      return false;
    } else if (name.value.length < 5) {
      alert("acc name too short");
      return false;
    } else if (
      number.value === "" ||
      number.value.length !== 10 ||
      isNaN(number.value)
    ) {
      console.log(number.value);
      alert("invalide acc number");
      return false;
    } else {
      return true;
    }
  }

  //Function Add / remove or toggle class
  function AddRemoveClass(element, a, className) {
    if (a === "add") {
      element.classList.add(className);
    } else if (a === "remove") {
      element.classList.remove(className);
    } else if (a === "toggle") {
      element.classList.toggle(className);
    } else {
      return false;
    }
  }

  // Add and remove animation
  function animated(element, animation) {
    // add the class animate and the animation
    AddRemoveClass(element, "add", "animated");
    AddRemoveClass(element, "add", animation);
    // remove the class animate and the animation thereby ending it
    setTimeout(() => {
      AddRemoveClass(element, "remove", "animated");
      AddRemoveClass(element, "remove", animation);
    }, 2000);
  }
  // a wait function for 1sec to remove/add/turn visibility/turn off visiblity/display none /display block
  function wait(element, a, className) {
    setTimeout(() => {
      switch (a) {
        case "add":
          return AddRemoveClass(element, "add", className);
          break;
        case "remove":
          return AddRemoveClass(element, "remove", className);
          break;
        case "vOn":
          return (element.style.visibility = "visible");
          break;
        case "vOff":
          return (element.style.visibility = "hidden");
          break;
        case "dshow":
          return (element.style.display = className);
          break;
        case "dnone":
          return (element.style.display = "none");
          break;

        default:
          return false;
          break;
      }
    }, 1000);
  }
  return {
    init: () => {
      setUpEventListeners();
    }
  };
})(AccountControler, UIControler);

controler.init();
