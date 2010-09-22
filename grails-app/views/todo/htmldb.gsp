<%@ page import="html5database.Todo" %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="layout" content="htmldb"/>
  <g:set var="entityName" value="${message(code: 'todo.label', default: 'Todo')}"/>
  <title><g:message code="default.list.label" args="[entityName]"/></title>
</head>
<body>

<div class="body">

  <h1>HTML5 Local Todo Database</h1>
  <ul id="todoItems">

  </ul>
  <form type="post">
    <input type="text" id="todo" name="todo"
            placeholder="What do you need to do?" style="width: 200px;"/>
    <br/>
    <input type="button" value="Add Todo Item" onclick="addTodo();
    return false;"/>
    <input type="button" value="Upload Todos to Server" onclick="uploadToRemote();
    return false;"/>
  </form>

  <h1>Remote (Server) Database</h1>
  <g:if test="${flash.message}">
    <div class="message">${flash.message}</div>
  </g:if>
  <div class="list">
    <table>
      <thead>
      <tr>

        <g:sortableColumn property="id" title="${message(code: 'todo.id.label', default: 'Id')}"/>

        <g:sortableColumn property="text" title="${message(code: 'todo.text.label', default: 'Text')}"/>

      </tr>
      </thead>
      <tbody>
      <g:each in="${todoInstanceList}" status="i" var="todoInstance">
        <tr class="${(i % 2) == 0 ? 'odd' : 'even'}">

          <td><g:link action="show" id="${todoInstance.id}">${fieldValue(bean: todoInstance, field: "id")}</g:link></td>

          <td>${fieldValue(bean: todoInstance, field: "text")}</td>

        </tr>
      </g:each>
      </tbody>
    </table>
  </div>
  <div class="paginateButtons">
    <g:paginate total="${todoInstanceTotal}"/>
  </div>
</div>

</body>
</html>
