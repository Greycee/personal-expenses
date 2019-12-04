class Expense{
  constructor(year, month, day, category, description, amount){
    this.year = year
    this.month = month
    this.day = day
    this.category = category
    this.description = description
    this.amount = amount
  }
  validateData(){
    // for each index in Expense
    // this[i] is to retrieve the value of each index
    for(let i in this){ 
      if(this[i] == undefined || this[i] == '' || this[i] == null){
        return false
      }
    }
    return true
  }
}

//this class is build to prevent the records overlapping anytime we save a new entry
class Database{
  constructor(){
    // we set the value 0 to the key id in order to not receive null anytime the object Database is constructed
    let id = localStorage.getItem('id')
    if (id === null){
      localStorage.setItem('id', 0)
    }
  }
  getNextId(){
    let nextId = localStorage.getItem('id')
    return parseInt(nextId) + 1
  }

  save(e){
    let id = this.getNextId()
    localStorage.setItem(id, JSON.stringify(e))
    localStorage.setItem('id', id)
  }

  recoverAllEntries(){
    //array of expenses 
    let expenses = Array()
    let id = localStorage.getItem('id')
    //recover all the expenses registered in localStorage
    for(let i = 1; i <= id; i++){ 
      //reccover the expense
      let expense = JSON.parse(localStorage.getItem(i))
      //if there is any index that was previously removed
      //don't add this item in the array
      if(expense == null){
        continue
      }
      expense.id = i
      expenses.push(expense)
    }
    return expenses
  }

  search(expense){
    let filteredExpenses = Array()
    filteredExpenses = this.recoverAllEntries()
    console.log(filteredExpenses)
    console.log(expense)

    if(expense.year != ''){
      filteredExpenses = filteredExpenses.filter(e => e.year == expense.year)
    }
      
    if(expense.month != ''){
      filteredExpenses = filteredExpenses.filter(e => e.month == expense.mes)
    }

    if(expense.day != ''){
      filteredExpenses = filteredExpenses.filter(e => e.day == expense.day)
    }

    if(expense.category != ''){
      filteredExpenses = filteredExpenses.filter(e => e.category == expense.category)
    }

    if(expense.description != ''){
      filteredExpenses = filteredExpenses.filter(e => e.description == expense.description)
    }

    if(expense.amount != ''){
      filteredExpenses = filteredExpenses.filter(e => e.amount == expense.amount)
    }
    return filteredExpenses
  }
  remove(id){
    localStorage.removeItem(id)
  }
}

let database = new Database()

function addEntry(){
  let year = document.getElementById('year')
  let month = document.getElementById('month')
  let day = document.getElementById('day')
  let category = document.getElementById('category')
  let description = document.getElementById('description')
  let amount = document.getElementById('amount')

  let expense = new Expense(
    year.value, 
    month.value, 
    day.value, 
    category.value, 
    description.value, 
    amount.value
  )
  let colorTitle = document.getElementById('colorTitle')
  let modalTitle = document.getElementById('modalTitle')
  let modalMessage = document.getElementById('modalMessage')
  let modalButton = document.getElementById('modalButton')
  
  if(expense.validateData()){
    database.save(expense)
    colorTitle.className = 'modal-header text-success'
    modalTitle.innerText = 'A new register was included'
    modalMessage.innerText = 'Your expense was successfully added!'
    modalButton.className = 'btn btn-success'
    modalButton.innerText = 'Ok'
    $('#modal').modal('show')
    year.value = '' 
    month.value = ''
    day.value = ''
    category.value = '' 
    description.value = ''
    amount.value = ''
  } else{
    colorTitle.className = 'modal-header text-danger'
    modalTitle.innerText = 'Error to save entry'
    modalMessage.innerText = 'All fields are mandatory and can not be saved if empty.'
    modalButton.className = 'btn btn-danger'
    modalButton.innerText = 'Go back and correct'
    $('#modal').modal('show')
  }
}

function loadListExpenses(expenses = Array(), filter = false){
  if(expenses.length == 0 && filter == false){
    expenses = database.recoverAllEntries()
  }

  let listExpenses = document.getElementById('listExpenses')
    listExpenses.innerHTML = ''
    expenses.forEach(function(e){
    var line = listExpenses.insertRow();
    line.insertCell(0).innerHTML = `${e.day}/${e.month}/${e.year}`
    switch(e.category){
      case '1': e.category = 'Food'
        break
      case '2': e.category = 'Education'
        break
      case '3': e.category = 'Entertainment'
        break
      case '4': e.category = 'Health'
        break
      case '5': e.category = 'Transportation'
        break
      case '6': e.category = 'Outher'
        break
    }
    line.insertCell(1).innerHTML = e.category
    line.insertCell(2).innerHTML = e.description
    line.insertCell(3).innerHTML = e.amount
    
    //create the button to delete expense
    let btn = document.createElement('button')
    btn.className = 'btn btn-danger'
    btn.innerHTML = '<i class="fas fa-times"></i>'
    btn.id = `id_expense_${e.id}`
    btn.onclick = function(){
      let id = this.id.replace('id_expense_', '')
      database.remove(id)
      window.location.reload()
    }
    line.insertCell(4).append(btn)
  })
 }

 function searchExpense(){
  let year = document.getElementById('year').value
  let month = document.getElementById('month').value
  let day = document.getElementById('day').value
  let category = document.getElementById('category').value
  let description = document.getElementById('description').value
  let amount = document.getElementById('amount').value

  let expense = new Expense(year, month, day, category, description, amount)
  let expenses = database.search(expense)
  this.loadListExpenses(expenses, true)
 }


