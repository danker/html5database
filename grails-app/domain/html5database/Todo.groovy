package html5database

class Todo {

    String text

    static constraints = {
        text(blank:false)
    }
}
