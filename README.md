Task-Executor
=============

Execute a series of tasks in a simple linear way without annoying callback functions.

Example:
-------------

    // create a task that can complete sth.  
    var task = new Task(function(ctx, callback) {  
        console.log('Hello World!');  
        callback();  
    });

    // get a TaskQueue instance.  
    var queue = TaskQueue.getInstance();

    // add some tasks into the queue.  
    queue.log('begin').add(task);  
    queue.wait(1000).log('wait for 1 second').add(task);  
    queue.log('end');

    // execute the tasks.  
    queue.execute();

+ Result:      
2014/2/2 1:59:21.648	| begin  
Hello World!  
2014/2/2 1:59:22.653	| wait for 1 second  
Hello World!  
2014/2/2 1:59:22.657	| end
