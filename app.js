let AccountControler = () => {
  const Account = (id, bank, accName, accNumber) => {
    this.bank = bank;
    this.accName = accName;
    this.accNumber = accNumber;
    this.id = id;
  };

  const User = (id, email, password) => {
    this.id = id;
    this.email = email;
    this.password = password;
  };

  data = {
    accounts: [],
    users: []
  };

  return {
    addAccount: (bank, accName, accNumber) => {
      let newAccount, ID;

      //create new ID
      if (data.accounts.length > 0) {
        ID = data.accounts[data.account.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new account
      newAccount = new Account(ID, accName, accNumber);

      // push new account to data structure
      data.accounts.push(newAccount);

      // return the new Account
      return newAccount;
    }
  };
};

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
    mainList: ".main__list",
    accItems: ".main__list-items",
    deleteBtn: ".main__list-items-delete",
    addBtn: ".add-btn",
    accItemsAct: ".main__list-items-acc",
    formContainer: ".form-container",
    closeForm: ".close"
  };

  return {
    getDOMstrings: () => {
      return DOMstrings;
    },

    addAccountList: obj => {
      let html, newHtml, element;
      // create HTML string with placeholder text %id%, %bank%, %accName%, %accNumber%
      html =
        '<li id="account-%id%" class="main__list-items"><div class="main__list-items-bank"><img src="./assets/%bank%.png" alt="%bank% bank logo"></div><div class="main__list-items-acc"><div class="main__list-items-acc-name">%accName%</div><div class="main__list-items-acc-number">%accNumber%</div></div><span id="delete-%id%" class="main__list-items-delete delete"><i class="fas fa-trash"></i></span></li>';

      // Replace placeholder text with actual text
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%bank%", obj.bank);
      newHtml = newHtml.replace("%accName%", obj.accName);
      newHtml = newHtml.replace("%accNumber%", obj.accNumber);

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    }
  };
})();

let controler = ((Actctrl, UIctrl) => {
  let setUpEventListeners = () => {
    //Navigation drawer function
    let DOM,
      sortActive,
      sortOptions,
      searchToggle,
      searchBox,
      searchField,
      searchIcon,
      mainList,
      deleteBtn,
      accItems,
      accItemsAct,
      addBtn,
      formContainer,
      overlay,
      navDrawer,
      closeForm;

    DOM = UIctrl.getDOMstrings();

    //add the nav drawer
    document.querySelector(DOM.menuBtn).addEventListener("click", () => {
      document.querySelector(DOM.navDrawer).classList.add("open");
      // adds the overlay with a fadeIn effect
      overlay.classList.add("on");
      animated(overlay, "fadeIn", "on");
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
    accItems = document.querySelector(DOM.accItems);
    deleteBtn = document.querySelector(DOM.deleteBtn);
    accItemsAct = document.querySelectorAll(DOM.accItemsAct);

    Array.from(accItemsAct).forEach(item => {
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
      AddRemoveClass(overlay, "add", "on");
      animated(overlay, "fadeIn");
      AddRemoveClass(formContainer, "add", "open");
    });

    // close form
    closeForm.addEventListener("click", () => {
      AddRemoveClass(overlay, "remove", "on");
      animated(overlay, "fadeOut");
      AddRemoveClass(formContainer, "remove", "open");
    });
  };

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
    AddRemoveClass(element, "add", "animate");
    AddRemoveClass(element, "add", animation);
    // remove the class animate and the animation thereby ending it
    setTimeout(() => {
      AddRemoveClass(element, "remove", "animate");
      AddRemoveClass(element, "remove", animation);
    }, 1000);
  }

  return {
    init: () => {
      setUpEventListeners();
    }
  };
})(AccountControler, UIControler);

controler.init();
