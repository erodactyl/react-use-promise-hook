# usePromise

To install run

```
npm i react-use-promise-hook
```
or
```
yarn add react-use-promise-hook
```

# Usage

```js
const counterPromise = () => {
	return new Promise(res => {
		setTimeout(() => res(Math.random()), 1000);
	});
};

const Example = () => {
	const [counter, errorMsg, loading, reset] = usePromise(counterPromise);
	if (loading) {
		return 'Loading...';
	} else if (errorMsg){
		return errorMsg;
	} else {
		return (
			<>
				<p>{counter}</p>
				<button onClick={reset}>Reset counter</button>
			</>
		);
	}
};
```
