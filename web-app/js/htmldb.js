/**
 * Created by IntelliJ IDEA.
 * User: eric
 * Date: Sep 21, 2010
 * Time: 9:59:26 PM
 * To change this template use File | Settings | File Templates.
 */
var html5rocks = {};
html5rocks.webdb = {};
html5rocks.webdb.db = null;

html5rocks.webdb.open = function() {
    var dbSize = 5 * 1024 * 1024; // 5MB
    html5rocks.webdb.db = openDatabase("Todo", "1.0", "Todo manager", dbSize);
}

html5rocks.webdb.createTable = function() {
    var db = html5rocks.webdb.db;
    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, added_on DATETIME)", []);
    });
    alert('end createtable');
}

html5rocks.webdb.addTodo = function(todoText) {
    alert('In addTodo form submit function! todoText == ' + todoText);
    var db = html5rocks.webdb.db;
    db.transaction(function(tx) {
        var addedOn = new Date();
        tx.executeSql("INSERT INTO todo(todo, added_on) VALUES (?,?)",
                [todoText, addedOn],
                function() {
                    html5rocks.webdb.getAllTodoItems(loadTodoItems);
                },
                html5rocks.webdb.onError);
    });
}

html5rocks.webdb.onError = function(tx, e) {
    alert("There has been an error: " + e.message);
}

html5rocks.webdb.onSuccess = function(tx, r) {

}


html5rocks.webdb.getAllTodoItems = function(renderFunc) {
    alert('in getAllTodoItems')
    var db = html5rocks.webdb.db;
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM todo", [], renderFunc,
                html5rocks.webdb.onError);
    });
}

html5rocks.webdb.deleteTodo = function(id) {
    var db = html5rocks.webdb.db;
    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM todo WHERE ID=?", [id],
                function() {
                    html5rocks.webdb.getAllTodoItems(loadTodoItems);
                },
                html5rocks.webdb.onError);
    });
}

function loadTodoItems(tx, rs) {
    alert('in loadTodoItems function');
    var rowOutput = "";
    var todoItems = document.getElementById("todoItems");
    for (var i = 0; i < rs.rows.length; i++) {
        rowOutput += renderTodo(rs.rows.item(i));
    }

    todoItems.innerHTML = rowOutput;
}

function renderTodo(row) {
    return "<li>" + row.todo + " [<a href='javascript:void(0);'  onclick='html5rocks.webdb.deleteTodo(" + row.ID + ");'>Delete</a>]</li>";
}

function init() {
    html5rocks.webdb.open();
    html5rocks.webdb.createTable();
    html5rocks.webdb.getAllTodoItems(loadTodoItems);
}

function addTodo() {
    var todo = document.getElementById("todo");
    html5rocks.webdb.addTodo(todo.value);
    todo.value = "";
}

function uploadToRemote() {
    alert('upload to remote');
}