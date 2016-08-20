$(document).ready(function() {
    getData();

    //button listeners
    $('#submitTask').on("click", postData);
    $('#dataTable').on("click", ".delete", deleteTask);
    $('#dataTable').on("click", ".update", updateTask);
    $('#dataTable').on('click', '.complete', completedTask);
});

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

function updateTask() {
    var testdata = {};
    var inputs = $(this).parent().children().serializeArray();
    $.each(inputs, function(i, field) {
        testdata[field.name] = field.value;
        console.log(testdata);
    });
    console.log("updateData searches through:", testdata);

    //finds updateButton's appened id refrencing rowValue.id
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

function postData() {
    event.preventDefault();


    var testdata = {};

    $.each($('#dataForm').serializeArray(), function(i, field) {
        testdata[field.name] = field.value;
        testdata.status = 'Incomplete'
    });

    $.ajax({
        type: 'POST',
        url: '/postData',
        data: testdata,
        success: function() {
            console.log('/POST success function ran');
            $('#dataTable').empty();
            getData();

        },
        error: function() {
            console.log('/POST didnt work');
        }

    });


    //come back to this
    // $('#item_name').text('');

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/getData',
        success: function(data) {
            console.log('/GET success function ran');
            buildTableHeader(['ID', 'Task', 'Status']);

            data.forEach(function(rowData, i) {
                var $el = $('<div id="' + rowData.id + '"></div>');

                //create empty array
                //loop through data and push to empty array
                //loop through now full and organized array >> append to dom
                var dataTable = ['id', 'task', 'status'];
                dataTable.forEach(function(property) {

                    // take each property and store it in an array
                    // then itterate through the array
                    // then have if statement that is like "status = Incomplete"
                    // take that specific part of the array, pop it out, and then shift it into the beginning of the array


                    var readonly = ''
                    if (property != 'task') {
                        readonly = 'readonly';
                    }

                    var $input = $('<input type="text" id="' + property + '"name="' + property + '" ' + readonly + '/>');
                    $input.val(rowData[property]);

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

function completedTask() {
    var testdata = {};
    var inputs = $(this).parent().children().serializeArray();
    $.each(inputs, function(i, field) {
        testdata[field.name] = field.value;
        testdata.status = 'Complete';
        console.log('this is the testdata:', testdata);
    });

    console.log("complete button searches through:", testdata);

    //finds updateButton's appened id refrencing rowValue.id
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


function buildTableHeader(headerList) {

    var $header = $('<div id="dataTableHead"></div>');
    headerList.forEach(function(property) {

        var $input = $('<input type="text" id="' + property + '"name="' + property + '" />');
        $input.val(property);
        $header.append($input);
        $('#dataTable').append($header);
    });
}
