---
title: 'I finally tried HTML drag-and-drop after 4 years of coding'
excerpt: 'I implemented drag and drop for my project after a shockingly long time I managed to avoid it. Here is what I learned.'
date: '2022-12-16'
---

> This series of learnings occurred while I was building an Algorithm Visualizer app. This app is hosted on Netlify, you can check out my progress [here](https://algorithms.sonng.dev/). I might have a dedicated post for this project in the future.

## Brief story

Four years after I started coding seriously, I finally had a chance to learn the browser’s drag-and-drop API. This happened today, while I was [replicating the Algorithm Visualizer app](https://youtu.be/msttfIHHkak) in React. In the beginning, I hard-coded the start node and the end node into a 50x20 grid. After managing to implement Dijkstra’s pathfinding algorithm and visualize the process, I started adding more features.

First, I wanted to be able to change the positions of the start node and the end node. There were some ways to go about this. If, say, I wanted to move the start node to row 3, column 5, I could either:

1. Have 2 inputs corresponding to the node’s row and column indexes, then enter 3 for the row and 5 for the column. This was very simple to implement in React, but the UI would be clunky.
2. Click on the node on row 3, column 5 to make it the new start node. This approach was equally simple, but how do I move the end node? With a right-click? Besides not being a fan of hijacking native interactions (users usually expected to see a menu on right-click), what if I wanted to move more than 2 nodes later?
3. Drag the node to the desired position, then drop it. This approach made the most sense to me, but I had never touched drag and drop before.

After some consideration, I decided to go with the last approach. I wanted to make something that looked like this:

![Drag and drop demo](/post-assets/221216-drag-and-drop-demo.gif)

Alright. Off to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) I went!

## Elements of a drag-and-drop interaction

To make dragging and dropping work, I needed the following things.

<aside>
⚛️ Since I implemented this feature with React, all example code snippets will be React code.

</aside>

### The draggable element

In my case, it would be the starting and ending nodes, which were, of course, `div` tags.

```tsx
<div className="node start" draggable />
```

```css
.node[draggable='true'] {
  cursor: grab;
}

.node[draggable='true']:active {
  cursor: grabbing;
}
```

### The drop zone

According to the [MDN doc](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#define_a_drop_zone), a drop zone must handle both the `dragover` and the `drop` events.

> By default, the browser prevents anything from happening when dropping something onto most HTML elements. To change that behavior so that an element becomes a *drop zone* or is *droppable*, the element must have both [ondragover](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event) and [ondrop](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event) event handler attributes.

There is another gotcha: the handler for `dragover` needs to call the `preventDefault()` method of the `event` object, or else the `drop` event handler will never be called. If it had not been for [this Pluralsight guide](https://www.pluralsight.com/guides/drag-and-drop-react-components#:~:text=The%20default%20drag%20over%20behavior%20of%20an%20element%20is%20to%20disable%20dropping%2C%20so%20in%20order%20to%20allow%20dropping%20the%20handler%20needs%20to%20prevent%20this%20default%20behavior%20by%20calling%20event.preventDefault().%20Drop%20will%20now%20be%20enabled%20on%20the%20component.), I would have wasted so much more time on this one. 🙏

The drop zone of my app was the grid that contained all nodes.

```tsx
// JSX
<div className="grid" onDragOver={handleDragOver} onDrop={handleDrop}>
	<div className="node start" draggable />
	<div className="node" />
	<div className="node" />
	<div className="node end" draggable />
</div>

// Logic
const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
	event.preventDefault(); // Very important to trigger 'drop' event
	event.dataTransfer.dropEffect = 'move';
};

const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
	...
};
```

For more info about `dropEffect`, see [this section on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#define_the_drop_effect).

### The elements in between

For basic drag and drop to work, only a draggable and a drop zone is enough. However, in my case, I wanted some nice ✨ visual effects ✨ while dragging. Specifically, each gray node would need to light up when the start/end node was dragged over it. This would better demonstrate where the node would move to if it was dropped. Therefore, I needed to listen for `dropenter` and `dropleave` events for each gray node as well.

```tsx
// JSX
<div
  className={`node ${isUnderDrag ? 'under-drag-start' : ''}`}
  onDragEnter={handleDragEnter}
  onDragLeave={handleDragLeave}
/>;

// Logic
const [isUnderDrag, setIsUnderDrag] = useState(false);

const handleDragEnter = () => {
  setIsUnderDrag(true);
};

const handleDragLeave = () => {
  setIsUnderDrag(false);
};
```

Note that depending on whether I was dragging the start node or the end node, the normal gray node would be assigned a different class for a different background color. I omitted this detail in the above snippet for simplicity, but we will dive into it right below.

```css
.node {
  background-color: #e6e6ea;
}

.node.start {
  background-color: #fe3e34;
}

.node.end {
  background-color: #34d484;
}

.node.under-drag-start {
  background-color: #ff6f68;
}

.node.under-drag-end {
  background-color: #88d8b0;
}
```

## Unsuccessful state management attempt: `event.dataTransfer`

Let’s review what we had until this point. There were 3 elements needed for the drag and drop feature: A draggable start/end node, a drop zone, and some visual effect for the gray nodes. The whole interaction could be described as follows:

1. A draggable node was dragged. At that point, it needed to register its type (start node or end node).
2. Along the drag, each normal node under the cursor would light up. The color depended on the type of the draggable node. The position of the node being dragged over will also be registered.
3. When dropped, the start/end node would move to the new position, which is the latest registered position of a normal node.

So I needed a way to manage the two states: the type of the draggable node, and the latest position of the normal node that was being dragged over (under the cursor). My first thought was to save these states to the `event.dataTransfer` object, because it was there for this exact purpose.

> [DataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer) objects include the drag event's state, such as the type of drag being done (like `copy` or `move`), the drag's data (one or more items), and the MIME type of each *drag item*. [DataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer) objects also have methods to add or remove items to the drag's data.

I assumed that this `dataTransfer` object would be accessible throughout the entire interaction from dragging to dropping, in other words, the data I saved from the `dragstart` event could be read and changed in the `dragenter`, `dragleave`, `dragover`, and `drop` events all the same. So I tried something like this:

```tsx
// JSX
<div className="grid" onDragOver={handleDragOver} onDrop={handleDrop}>
	<div className="node start" draggable onDragStart={handleDragStart} />
	<div className="node" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} />
	...
</div>

// Logic
const handleDragStart: DragEventHandler<HTMLDivElement> = (event) => {
	// Register the type of the draggable node
	const nodeType = ...;
	const row = ...;
	const col = ...;
	event.dataTransfer.setData('text/plain', `${nodeType} ${row} ${col}`);
};

const handleDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
  // Register the position of the node under the cursor
	const nodeType = event.dataTransfer.getData('text/plain').split(' ')[0];
	const row = ...;
	const col = ...;
	event.dataTransfer.setData('text/plain', `${nodeType} ${row} ${col}`);
	// Light up the node
	event.target.classList.add(nodeType === 'start' ? 'under-drag-start' : 'under-drag-end');
};

const handleDragLeave: DragEventHandler<HTMLDivElement> = (event) => {
	// Make the node gray again
	const nodeType = event.dataTransfer.getData('text/plain').split(' ')[0];
	event.target.classList.remove(nodeType === 'start' ? 'under-drag-start' : 'under-drag-end');
};

const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
	event.preventDefault(); // Very important to trigger 'drop' event
	event.dataTransfer.dropEffect = 'move';
};

const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
  // Move the draggable node to the new position
	const data = event.dataTransfer.getData('text/plain').split(' ');
	const nodeType = data[0];
	const row = Number(data[1]);
	const col = Number(data[2]);
	...; // Move logic in React
};
```

But here is a major caveat: **I was wrong** 😭. [This Stack Overflow answer](https://stackoverflow.com/a/31922258/9744063) explained that due to security reasons, the information saved to `dataTransfer` could only be accessed in the `dragstart` and `drop` events, other events in the middle just saw an empty string when they called `event.dataTransfer.getData('text/plain')`. Although this made the interaction safer, it also made the `dataTransfer` object useless for our purpose.

## Successful state management attempt: Good old React

Time to go back to our old, reliable friend, the React state.

```tsx
// JSX
<div className="grid" onDragOver={handleDragOver} onDrop={handleDrop}>
	<div className="node start" draggable onDragStart={handleDragStart} />
	<div className="node" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} />
	...
</div>

// Logic
const [dragState, useDragState] = useState({
	isActive: false,
	nodeType: null,
	row: 0,
	col: 0,
});

const handleDragStart: DragEventHandler<HTMLDivElement> = (event) => {
	// Register the type of the draggable node
	const nodeType = ...;
	const row = ...;
	const col = ...;
	setDragState({ isActive: true, nodeType, row, col });
};

const handleDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
	// Register the position of the node under the cursor
	const row = ...;
	const col = ...;
	setDragState({ ...dragState, row, col });
	// Light up the node
	event.target.classList.add(dragState.nodeType === 'start' ? 'under-drag-start' : 'under-drag-end');
};

const handleDragLeave: DragEventHandler<HTMLDivElement> = (event) => {
	// Make the node gray again
	event.target.classList.remove(dragState.nodeType === 'start' ? 'under-drag-start' : 'under-drag-end');
};

const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
	event.preventDefault(); // Very important to trigger 'drop' event
	event.dataTransfer.dropEffect = 'move';
};

const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
	// Move the draggable node to the new position
	const { nodeType, row, col } = dragState;
	...; // Move logic in React

	// Reset drag state
	setDragState({
		isActive: false,
		nodeType: null,
		row: 0,
		col: 0,
	});
};
```

## Conclusion

Nowadays in the JavaScript/TypeScript and React ecosystem, there is a*t least* a library for everything you want to do. You can probably use `react-dnd` or `react-beautiful-dnd`, among others, to implement drag-and-drop interactions, especially more complex ones. However, my needs were simple enough that the browser’s default API was enough. Moreover, it is always good to dive into it at the lowest, simplest level before moving on to higher abstraction levels, right? 🤓

I hope you enjoyed hearing me ramble about this experience, and I am even more thrilled if you learned something from it. See you in the next one! 🙌
