//Problem: Client needs a way to record employee information and calculate cost of monthly employee salary
//Solution: Create an application that recordes employees along with their salary

var counter = 0;
var employeeArray =[];

//Executables
$(document).ready(function(){
  $('#employeeInformation').on('submit', handleSubmit);
  $('.employee-nodes').on('click', '.employee-removal', removify);
});

//Input: Takes in user entered data
//Output: Calculates employee information, returns monthly costs, and appends useful information to the DOM
function handleSubmit(event){
  event.preventDefault();
  var employees = {};
    $.each($('#employeeInformation').serializeArray(), function(i, field){
      employees[field.name] = field.value;
    });

    $('#employeeInformation').find('input[type=text]').val('');
    $('#employeeInformation').find('input[type=number]').val('');

    //Checks to see if fields are empty
    //If not, run core script
    if(employees.firstName == "" || employees.lastName == "" || employees.employeeID == "" || employees.jobTitle == "" || employees.currentSalary == 0){
      alert("Please Enter Applicable Values");
    } else {
      employeeArray.push(employees);
      totalSalaryCalculation();
      appendDOM(employeeArray[counter]);
    }
}

//Input: Takes in object created by user
//Output: Writes items to the DOM
function appendDOM(object){

    $('.employee-nodes').append('<div class="employee-info"></div>');
    var $el = $('.employee-nodes').children().last();

      $el.append('<h2>' + object.firstName + ' ' + object.lastName + '</h2>');
      $el.append('<p>Employee ID: ' + object.employeeID + '</p>');
      $el.append('<p>Position: ' + object.jobTitle + '</p>');
      $el.append('<p>Current Salary: $' + object.currentSalary + '</p>');
      $el.append('<button class="employee-removal" data-empid="' + object.employeeID + '">Removify</button>');
      counter++;
}

//Removes clicked item and parent from DOM
//Recalculates combined employee total costs
function removify(){

  for(var j = 0; j < employeeArray.length; j++){
    if(employeeArray[j].employeeID == $(this).data('empid')){
        employeeArray.splice(j, 1);
    }
    //Recalcuate total employee expenses
    totalSalaryCalculation();
  }
  $(this).parent().remove();
  counter--;
}

//Input: Takes in employees' salary information
//Output: Returns monthly cost of salaries
function totalSalaryCalculation(){

  var allEmployeeSalaries = 0;
      for(var i = 0; i < employeeArray.length; i++){
        var employee = employeeArray[i].currentSalary;
        allEmployeeSalaries += parseInt(employee);
      }
      allEmployeeSalaries = Math.round(convertToMonthly(allEmployeeSalaries));
      $('.totalSalaryCost').text('Total Salary Cost Per Month: $' + allEmployeeSalaries);
}

//Input: Takes in salary of employees
//Output: Returns the monthly cost to pay employees
function convertToMonthly(value){
  Math.round(value /= 12);
  return value;
}
