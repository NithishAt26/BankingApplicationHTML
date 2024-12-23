class BankAccount {
  constructor(accountId, accountHolderName) {
    this.accountId = accountId;
    this.accountHolderName = accountHolderName;
    this.balance = 0;
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      return `Deposited ${amount} successfully.`;
    } else {
      return "Deposit amount must be positive.";
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return `Withdrew ${amount} successfully.`;
    } else {
      return "Insufficient balance or invalid amount.";
    }
  }

  displayBalance() {
    return `Account Holder: ${this.accountHolderName} | Account ID: ${this.accountId} | Balance: ${this.balance}`;
  }
}

class Bank {
  constructor() {
    this.accounts = {};
    this.accountCounter = 1;
  }

  createAccount(name) {
    const newAccount = new BankAccount(this.accountCounter, name);
    this.accounts[this.accountCounter] = newAccount;
    return `Account created successfully. Account ID: ${this.accountCounter++}`;
  }

  deposit(accountId, amount) {
    const account = this.accounts[accountId];
    return account ? account.deposit(amount) : "Account not found.";
  }

  withdraw(accountId, amount) {
    const account = this.accounts[accountId];
    return account ? account.withdraw(amount) : "Account not found.";
  }

  checkBalance(accountId) {
    const account = this.accounts[accountId];
    return account ? account.displayBalance() : "Account not found.";
  }
}

const bank = new Bank();
const options = document.getElementById("options");
const formContainer = document.getElementById("formContainer");
const executeButton = document.getElementById("executeButton");
const output = document.getElementById("output");

const renderForm = () => {
  const selectedOption = options.value;
  formContainer.innerHTML = ""; // Clear previous form

  if (selectedOption === "createAccount") {
    formContainer.innerHTML = `
            <label>Enter Account Holder Name: <input type="text" id="accountHolderName" /></label>
        `;
  } else if (["depositMoney", "withdrawMoney"].includes(selectedOption)) {
    formContainer.innerHTML = `
            <label>Enter Account ID: <input type="number" id="accountId" /></label>
            <label>Enter Amount: <input type="number" id="amount" /></label>
        `;
  } else if (selectedOption === "checkBalance") {
    formContainer.innerHTML = `
            <label>Enter Account ID: <input type="number" id="accountId" /></label>
        `;
  }
};

const executeAction = () => {
  const selectedOption = options.value;
  let result = "";

  if (selectedOption === "createAccount") {
    const name = document.getElementById("accountHolderName").value.trim();
    if (name) {
      result = bank.createAccount(name);
    } else {
      result = "Please enter a valid name.";
    }
  } else if (["depositMoney", "withdrawMoney"].includes(selectedOption)) {
    const accountId = parseInt(document.getElementById("accountId").value);
    const amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(accountId) || isNaN(amount)) {
      result = "Please enter valid account ID and amount.";
    } else {
      result =
        selectedOption === "depositMoney"
          ? bank.deposit(accountId, amount)
          : bank.withdraw(accountId, amount);
    }
  } else if (selectedOption === "checkBalance") {
    const accountId = parseInt(document.getElementById("accountId").value);

    if (isNaN(accountId)) {
      result = "Please enter a valid account ID.";
    } else {
      result = bank.checkBalance(accountId);
    }
  }

  output.textContent = result;
};

options.addEventListener("change", renderForm);
executeButton.addEventListener("click", executeAction);

// Initialize the form
renderForm();
