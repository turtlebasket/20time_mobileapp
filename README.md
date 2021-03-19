

<div align="center">
<h1>Social Todo Mobile App</h1>
Made with React Native (TypeScript)
</div>

## To Do

- [x] Make TodoList settings page directly accessible from TodoList_ListView 
- [x] Add the ability to add/edit todo items in a list
- [x] Todo Checkability, stored
- [x] Automatically move checked TodoItems to bottom of TodoList, in order of most recent (in setTodoItem)
- [ ] When unchecking bottom TodoItems, move back to top automatically & FIX DRAG GLITCH
- [ ] Clear all checked todos
- [ ] Due dates
- [ ] Repeating todos
- [ ] Habits data structure
- [ ] Todo success rate tracking
- [ ] Begin habits/analytics page layout
- [ ] Ability select multiple todos / batch actions
- [ ] Separate adder component for todo items (text bar at bottom? circular plus button in corner/both?)

##  User Data Structure  


```ts
currentUser: "<current user guid",
users: [
    {
        id: "<user guid>",
        name: "",
        email: "",
        dob: "",
        todoLists: [
            {
                id: "<todoList guid>",
                title: "Errands",
                description: "",
                public: false,
                todoItems: [
                    {
                        id: "<todo guid>" ,
                    	title: "todo example",
                    	description: "123",
                        dueDate: null,
                        complete: false
                    },
                    {
                        id: "<todo guid>",
                        title: "another todo example",
                        description: "blah",
                        dueDate: "<ISO time>",
                        complete: true
                    }
                ]
            }
        ],
        connections: [ // friends
            "<guid>",
            "<guid>"
        ]
    }
];
```
