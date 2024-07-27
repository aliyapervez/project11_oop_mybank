#!/usr/bin/env node

import inquirer from "inquirer"

// bank Account Interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number) : void
    deposit(amount: number) : void
    checkBalance() : void
}

// Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;
    
    constructor
    (accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    //Debit money

    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`Withdrawal successful of $${amount}, Remaining balance: $${this.balance}`);
        } else {
            console.log("Insufficient funds.");
        }
    }

    //Credit money
    deposit(amount: number): void {
        if(amount > 100){
            amount -= 1; //$1 fee charged if more than $100 is deposited
      } this.balance += amount;
        console.log(`Deposit successful of $${amount}, New balance: $${this.balance}`);
    }

    //Check current balance

    checkBalance(): void {
        console.log(`Current balance: $${this.balance}`);
    }
}

//Customer class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    accounts: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, accounts: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.accounts = accounts;
    }
}
// Creat Bank Accounts

const accounts: BankAccount[] =[
new BankAccount (1001, 3000),
new BankAccount (1002, 3400),
new BankAccount (1003, 3200),
];

// Create customers
const customers: Customer[] = [
    new Customer("Aliya", "Pervez", "Female", 30, 3216543210, accounts[0]),
    new Customer("Mukesh", "Ambani", "Male", 58, 3456543209, accounts[1]),
    new Customer("Maaz", "Khan", "Male", 32, 3336543208, accounts[2]),
]

//Function to interact with bank account

async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:",
        })

        const customer = customers.find(cus => cus.accounts. accountNumber === accountNumberInput.accountNumber);
       
        if(customer){
            console.log(`"Welcome, ${customer.firstName} ${customer.lastName}!\n`);

             let operationAnswer = await inquirer.prompt([{
            
                type: "list",
                name: "select",
                message: "Choose an operation:",
                choices: ["Check Balance", "Deposit", "Withdraw", "Exit"]
            
            }]);  
            
            switch(operationAnswer.select){
                
                    case "Deposit":
                        const depositAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter amount to deposit:", 
                         
                        })
                        customer.accounts.deposit(depositAmount.amount)
                        break;
                    case "Withdraw":
                        const withdrawAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter amount you want to withdraw:", 
                         
                        })
                        customer.accounts.withdraw(withdrawAmount.amount)
                        break;
                    case "Check Balance":
                    customer.accounts.checkBalance();
                    break;
                  
                        case "Exit":
                            console.log("Thank you for using our services. Goodbye!\n");
                            process.exit();
                          
                         
            }    
        }
        else{
            console.log("Invalid account number. Please try again.");
        }
    }


    while(true)
  
}

service()