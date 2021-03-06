

<div align="center">
<h1>Social Todo Mobile App</h1>
Made with React Native (TypeScript)
</div>

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
        			},
                	{
                    	id: "<todo guid>",
                    	title: "another todo example",
                    	description: "blah",
                        dueDate: "<ISO time>"
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