Module.register('MMM-Bixi', {
	getDom: function () {
		const wrapper = document.createElement('div');
		wrapper.innerHTML = 'hello world';

		return wrapper;
	},
});
