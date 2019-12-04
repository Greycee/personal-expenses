APP Personal Expenses
=====================

This APP was developed using Object Oriented in JavaScript. 

The idea behind this app is to allow users to register their expenses by categories and store this data in Local Storage (data is stored on browser) so the users can include and consult their entries. It also allow users to filter data by any specific field.

**what is used here:**

- Bootstap to generate the whole css and responsiveness 
- classes
- objects 
- conditionals
- for in loop
- for loop
- switch statement
- create html element using JS
- setItem (insert data into local storage) and getItem (recover any data from local storage)
- convert literal objects into JSON (JSON.stringify)
- convert JSON into literal objects (JSON.parse)  

**literal objects**
exist only inside the application and I can use this notation to manipulate the object in any desirable way inside my application. 

let product = {
  category: 'appliance',
  description: 'fridge',
  price: 500
}

**JSON** 
The whole object is a single string, key values also appear inside quotation marks.
If we need to pass the information contained in this literal object to anything that is outside our application, such as  communicate with local storage for example, then we need to convert it to JSON. 


let productJSON = '{"category": "appliance", "description": "fridge", "price": 500}' 
