

<div align="center">
<h1>Social Todo Mobile App</h1>
Made with React Native (TypeScript)
</div>

## TodoList - Fundamentals

- [x] Make TodoList settings page directly accessible from TodoList_ListView 
- [x] Add the ability to add/edit todo items in a list
- [x] Todo Checkability, stored
- [x] Automatically move checked TodoItems to bottom of TodoList, in order of most recent (in setTodoItem)
- [x] When unchecking bottom TodoItems, move back to top automatically
- [x] Clear all checked todos
- [ ] Due dates
- [ ] Todo success rate tracking

## TodoList - QoL

- [ ] FIX DRAG GLITCH
- [ ] Non-reorderable checked items (STAY AT BOTTOM!)
- [ ] Repeating todos
- [ ] Ability select multiple todos / batch actions
- [ ] Separate adder component for todo items (text bar at bottom? circular plus button in corner/both?)

## Habits - Fundamentals

- [x] Basic screens
- [ ] Habits data structure
  - [ ] REPETITION STORAGE
- [ ] Begin analytics/repetition-checking page layout (much like habits 🔄 app)

## Activity Feed - Fundamentals

- [ ] Connect to server & get some data

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
        habits: [
            {
                id: "GUID",
                title: "Go running",
                repeatTimestamps: [ // short-term times; dynamnically generated for now
                    "123123498233",
                    "132409285029",
                ]
            }
        ]
        connections: [ // friends
            "<guid>",
            "<guid>"
        ]
    }
];
```
