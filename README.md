

<div align="center">
<h1>Social Todo Mobile App</h1>
Made with React Native (TypeScript)
</div>
## To Do

- [ ] Separate public/private dialog function
- [ ] Make TodoList settings page directly accessible from TodoList_ListView 
- [ ] Add the ability to add/edit todo items in a list
- [ ] Automatically move checked TodoItems to bottom of TodoList, in order of most recent
- [ ] Separate add/edit for todos (adder bar at bottom)
- [ ] Begin habits page layout

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
