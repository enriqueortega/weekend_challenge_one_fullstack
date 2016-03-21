//Problem: Client needs a way to record employee information and calculate cost of monthly employee salary
//Solution: Create an application that recordes employees along with their salary

var counter = 0;

//Executables
$(document).ready(function(){
  $('#employeeInformation').on('submit', handleSubmit);
  $('.employee-nodes').on('click', '.employee-removal', removify);
  init();
});

// Pulls data, appendsDOM, calculates total
function init(){
  pullEmployees();
}


//Input: Takes in user entered data
//Output: Calculates employee information, returns monthly costs, and appends useful information to the DOM
function handleSubmit(event){
  event.preventDefault();
  var employees = {};
    $.each($('#employeeInformation').serializeArray(), function(i, field){
      employees[field.name] = field.value;
    });

    console.log(employees);

    //Place AJAX call here
    $.ajax({
      type: 'POST',
      url: '/employees',
      data: employees,
      success: function(data){
        console.log('sup ', data);
        init();
      }
    });

    //Resets Form Fields
    $('#employeeInformation').find('input[type=text]').val('');
    $('#employeeInformation').find('input[type=number]').val('');
}

function pullEmployees(){
  $.ajax({
    type: 'GET',
    url: '/employees',
    success: function(response){
      appendDOM(response);
      totalSalaryCalculation(response);
    }
  });
}

//Input: Takes in object created by user
//Output: Writes items to the DOM
function appendDOM(response){
  $('.employee-nodes').empty();
  counter = 0;

  response.forEach(function(person){
    $('.employee-nodes').append('<div class="employee-info"></div>');
    var $el = $('.employee-nodes').children().last();

    $el.append('<h2>' + person.first_name + ' ' + person.last_name + '</h2>');
    $el.append('<p>Employee ID: ' + person.employee_id + '</p>');
    $el.append('<p>Position: ' + person.job_title + '</p>');
    $el.append('<p>Current Salary: $' + person.current_salary + '</p>');
    $el.append('<button class="employee-removal" data-empid="' + person.employee_id + '">Removify</button>');
    counter++;
  });
}

//Input: Takes in employees' salary information
//Output: Returns monthly cost of salaries
function totalSalaryCalculation(response){
  var allEmployeeSalaries = 0;

  response.forEach(function(person){
    salary = person.current_salary;
    allEmployeeSalaries += parseInt(salary);
  });

  allEmployeeSalaries = Math.round(convertToMonthly(allEmployeeSalaries));
  $('.totalSalaryCost').text('Total Salary Cost Per Month: $' + allEmployeeSalaries);
}

//Input: Takes in salary of employees
//Output: Returns the monthly cost to pay employees
function convertToMonthly(value){
  Math.round(value /= 12);
  return value;
}

//TODO: Currently doesn't work with code, make functional with server and database
//Removes clicked item and parent from DOM
//Recalculates combined employee total costs
function removify(){

  // // for(var j = 0; j < employeeArray.length; j++){
  // //   if(employeeArray[j].employeeID == $(this).data('empid')){
  // //       employeeArray.splice(j, 1);
  // //   }
  //   //Recalcuate total employee expenses
  //   totalSalaryCalculation();
  // }
  $(this).parent().remove();
  counter--;
}
