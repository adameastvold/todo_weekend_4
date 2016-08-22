$(document).ready(function() {
    getData();

    //  LISTENERS
    $('#submitTask').on("click", postData);
    $('#dataTable').on("click", ".delete", deleteTask);
    $('#dataTable').on("click", ".update", updateTask);
    $('#dataTable').on('click', '.complete', completedTask);
});

//  DELETE FUNCTIONALITY
function deleteTask() {
    var testdataID = $(this).attr("id");

    $.ajax({
        type: 'DELETE',
        url: '/deleteTask/' + testdataID,
        success: function() {
            console.log('DELETED ITEM: ID:', testdataID);

            $('#dataTable').empty();
            getData();
        },
        error: function() {
            console.log("error in delete");
        }
    });
}

//  UPDATE TASK FUNCTIONALITY
function updateTask() {
    var testdata = {};
    var inputs = $(this).parent().children().serializeArray();
    $.each(inputs, function(i, field) {
        testdata[field.name] = field.value;
        console.log(testdata);
    });
    console.log("updateData searches through:", testdata);

    var testdataID = $(this).parent().attr('id');

    $.ajax({
        type: 'PUT',
        url: '/updateTask/' + testdataID,
        data: testdata,
        success: function() {
            $('#dataTable').empty();
            getData();
        },
        error: function() {

        }
    });

}


//  SEND DATA TO SERVER
function postData() {
    event.preventDefault();


    var testdata = {};

    $.each($('#taskForm').serializeArray(), function(i, field) {
        testdata[field.name] = field.value;
        testdata.status = 'Incomplete'
    });

    $.ajax({
        type: 'POST',
        url: '/postData',
        data: testdata,
        success: function() {
            console.log('/POST success function ran with this object:', testdata);
            $('#dataTable').empty();
            getData();

        },
        error: function() {
            console.log('/POST didnt work');
        }

    });

}


// THIS APPENDS TO THE DOM & CONTROLS THE 'READONLY' OF THE INPUTS
function getData() {
    $.ajax({
        type: 'GET',
        url: '/getData',
        success: function(data) {
            console.log('/GET success function ran');
            buildTableHeader(['Task', 'Status']);

            data.forEach(function(rowData, i) {
                var $el = $('<div id="' + rowData.id + '"></div>');
                console.log(rowData);
                //create empty array
                //loop through data and push to empty array
                //loop through now full and organized array >> append to dom
                var dataTable = ['task', 'status'];
                console.log('this is the dataTable:', dataTable);
                dataTable.forEach(function(property) {

                    // take each property and store it in an array
                    // then itterate through the array
                    // then have if statement that is like "status = Incomplete"
                    // take that specific part of the array, pop it out, and then shift it into the beginning of the array

                    var readonly = ''
                    if (property != 'task') {
                        readonly = 'readonly';
                    }

                    // if (property.status == 'Complete') {
                    //     $('.incompleteTaskBox').toggleClass('.completedTaskBox');
                    // }

                    var $input = $('<input class="incompleteTaskBox" type="text" id="' + property + '"name="' + property + '" ' + readonly + '/>');
                    $input.val(rowData[property]);
                    console.log('this is rowData[property]', rowData[property]);
                    $el.append($input);

                });

                $el.append('<button id=' + rowData.id + ' class="update">Update</button>');
                $el.append('<button id=' + rowData.id + ' class="delete">Delete</button>');
                $el.append('<button id=' + rowData.id + ' class="complete">Complete</button>');


                $('#dataTable').append($el);
            });
        },

        error: function(response) {
            console.log('GET /getData fail. No data could be retrieved!');
        },
    });

}

// THIS CONTROLS THE INCOMPLETE TO COMPLETE FUNCTION
function completedTask() {


    var testdata = {};
    var inputs = $(this).parent().children().serializeArray();
    $.each(inputs, function(i, field) {
        testdata[field.name] = field.value;
        testdata.status = 'Complete';

        console.log('this is the testdata:', testdata);
    });

    console.log("complete button searches through:", testdata);

    var testdataID = $(this).parent().attr('id');

    $.ajax({
        type: 'PUT',
        url: '/completeTask/' + testdataID,
        data: testdata,
        success: function() {
            $('#dataTable').empty();
            getData();
        },
        error: function() {

        }
    });

}

// THIS CREATES THE HEADER TO THE TABLE OF TASKS. Looking back, I should have named my table the table of tasks, because that's awesome.
function buildTableHeader(headerList) {

    var $header = $('<div id="dataTableHead"></div>');
    headerList.forEach(function(property) {

        //going to need to include an if statement that won't append ID


        var $input = $('<input type="text" id="' + property + '"name="' + property + '" />');



        $input.val(property);

        $header.append($input);

        $('#dataTable').append($header);

    });
}
