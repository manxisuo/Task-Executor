// ---------------------------------------------------------------------------

// 任务。
function Task(what) {
	this.what = what;
}

Task.prototype.getWhat = function() {

	return this.what;
}

 // 任务队列。
function TaskQueue() {
	this.tasks = [];
	this.count = 0;
}

// 获取实例。
TaskQueue.getInstance = function() {
	var instance = new TaskQueue();

	return instance;
}

 // 添加任务。
TaskQueue.prototype.add = function(task) {
	this.tasks.push(task);

	return this;
}

// 执行任务
TaskQueue.prototype.execute = function(ctx, callback) {
	var tasks = this.tasks;
	var _this = this;

	// 执行每个任务
	var invokeOne = function(tasks, ctx) {
		if (_this.count == tasks.length) {
			if (callback) callback();
			return;
		}

		var task = tasks[_this.count];
		var what = task.getWhat();
		what(ctx, function() {
			handler(tasks, ctx);
		});
	};

	// 回调函数
	var handler = function(tasks, ctx) {
		_this.count ++;
		invokeOne(tasks, ctx);
	};

	// 启动任务队列
	invokeOne(tasks, ctx);
}

// 等待。
TaskQueue.prototype.wait = function(time) {
	var task = new Task(function(ctx, callback) {
		setTimeout(function() {
			callback();
		}, time);
	});
	
	this.add(task);
	
	return this;
}

// 记录日志。
TaskQueue.prototype.log = function(msg) {
	var task = new Task(function(ctx, callback) {
		Util.log(Util.stamp() + '\t| ' + msg);
		callback();
	});

	this.add(task);

	return this;
}

// ---------------------------------------------------------------------------

// 工具。
var Util = {
	// 获取时间戳。
	stamp: function() {
		var d = new Date();
		var head = [d.getFullYear(), d.getMonth(), d.getDate()].join('/');
		var tail = [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
		var stamp = head + ' ' + tail + '.' + d.getMilliseconds();

		return stamp;
	},
	// 打印日志。
	log: function(msg) {
		if (console && console.log) {
			console.log(msg);
		}
	}
};



