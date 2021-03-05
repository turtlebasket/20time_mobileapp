

<div align="center">
<h1>Social Todo Mobile App</h1>
Made with React Native (TypeScript)
</div>
##  User Data Structure  


```ts
currentUser = "<current user guid"
users = [
    {
        id: "<user guid>",
        name: "",
        email: "",
        dob: "",
        todoLists: [
        	{
           	 id: "<todoList guid>",
           	 title: "",
          	  description: "",
           	 todos: [
            		{
           				id: "<todo guid>" ,
                    	title: "do this",
                    	description: "123",
        			},
                	{
                    	id: "<todo guid>",
                    	title: "do another thing",
                    	description: "blah"
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