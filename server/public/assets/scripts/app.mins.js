/*! back_to_the_future 2016-03-20 */
function init(){pullEmployees()}function handleSubmit(a){a.preventDefault();var b={};$.each($("#employeeInformation").serializeArray(),function(a,c){b[c.name]=c.value}),console.log(b),$.ajax({type:"POST",url:"/employees",data:b,success:function(a){console.log("sup ",a),init()}}),$("#employeeInformation").find("input[type=text]").val(""),$("#employeeInformation").find("input[type=number]").val("")}function pullEmployees(){$.ajax({type:"GET",url:"/employees",success:function(a){appendDOM(a),totalSalaryCalculation(a)}})}function appendDOM(a){$(".employee-nodes").empty(),counter=0,a.forEach(function(a){$(".employee-nodes").append('<div class="employee-info"></div>');var b=$(".employee-nodes").children().last();b.append("<h2>"+a.first_name+" "+a.last_name+"</h2>"),b.append("<p>Employee ID: "+a.employee_id+"</p>"),b.append("<p>Position: "+a.job_title+"</p>"),b.append("<p>Current Salary: $"+a.current_salary+"</p>"),b.append('<button class="employee-removal" data-empid="'+a.employee_id+'">Removify</button>'),counter++})}function totalSalaryCalculation(a){var b=0;a.forEach(function(a){salary=a.current_salary,b+=parseInt(salary)}),b=Math.round(convertToMonthly(b)),$(".totalSalaryCost").text("Total Salary Cost Per Month: $"+b)}function convertToMonthly(a){return Math.round(a/=12),a}function removify(){$(this).parent().remove(),counter--}var counter=0;$(document).ready(function(){$("#employeeInformation").on("submit",handleSubmit),$(".employee-nodes").on("click",".employee-removal",removify),init()});