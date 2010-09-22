<%@ page import="html5database.Todo" %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="layout" content="htmldb"/>
  <g:set var="entityName" value="${message(code: 'todo.label', default: 'Todo')}"/>
  <title><g:message code="default.list.label" args="[entityName]"/></title>
</head>
<body>
<p/>
<h2 id="toc-final">HTML5 Local Todo Database</h2>
<p/>
<ul id="todoItems">

</ul>
<form type="post" onsubmit="addTodo();
return false;">
  <input type="text" id="todo" name="todo"
          placeholder="What do you need to do?" style="width: 200px;"/>
  <input type="submit" value="Add Todo Item"/>
</form>


</body>
</html>
