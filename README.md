# Search Box

This is a simple search filter build in react which show the result based matched data field. 
It is designed by keeping web accessibility in mind where user can navigate result view using keyboard up down key.

## Deveopment Setup
```
yarn install
yarn start
```

## Features


### Automatically focus on input filed as the page load this is achieved using useRef.
`<input ref={inputRef}>` 
After the page render or the first time you will get the access to the input field. In the useEffect `inputRef.current.focus()` is placed and adding empty array to avoid unnecessary rendering.


### Added eventListener to listen keyboard events.
By taking advantage of useEffect added `onkeydown` event over body, so if someone use keyboard can be track accordingly actions can be trigger.
When the page mount eventListener are added by as we switch to anothet page i.e. unmount listener are still waiting for event, so to remove unwanted listener - returning new function from useEffect which remove them.
```jsx
    useEffect(() => {
        if (data.length > 0) {
            document.body.addEventListener('keydown', onKeyDown)
            document.body.addEventListener('mousemove', onMouseMove)
        } else {
            document.body.removeEventListener('keydown', onKeyDown)
        }
        return () => {
            document.body.removeEventListener('keydown', onKeyDown)
            document.body.removeEventListener('mousemove', onMouseMove)
        }
    }, [data])
```

### Trigger action when key are pressed to navigate card in result view.
Backspace, ArrowUp and ArrowDown these are the three case where action is trigger.
OnKeyDown trigger and `event.code` show which key is trigger based on that we navigate the result view.
```jsx
    const onKeyDown = (event) => {

        const isInputFocused = document.activeElement === inputRef.current
        const resultItems = Array.from(resultRef.current.children)

        const activeResultIndex = resultItems.findIndex(child => {
            return child.querySelector('a') === document.activeElement
        })

        if (event.key === 'ArrowUp') {
            if (isInputFocused) {
                resultItems[resultItems.length - 1].querySelector('a').focus();
            } else if (resultItems[activeResultIndex - 1]) {
                resultItems[activeResultIndex - 1].querySelector('a').focus();
            } else {
                inputRef.current.focus();
            }
        }

        if (event.key === 'ArrowDown') {
            if (isInputFocused) {
                resultItems[0].querySelector('a').focus();
            } else if (resultItems[activeResultIndex + 1]) {
                resultItems[activeResultIndex + 1].querySelector('a').focus();
            } else {
                inputRef.current.focus();
            }
        }

        if (event.key === 'Backspace') {
            inputRef.current.focus();
        }
    }
```
Similary the `onMouseMove` trigger which remove the focus from xyz card in result view beacuse keyboard will take preference if mouse is kept hovered on the list, similarly mouse will take preference if keyboard navigation is not used.
```jsx
    const onMouseMove = () => {
        inputRef.current.focus()
    }
```
### Highlight match string in the card of result view.
To get the highligted string in result im using below function which take text, string which eneter in the input field, id(used as key in map) and style.
Used RegExp whith [gi(global and insensitive)](https://stackoverflow.com/a/27916097/7816309) modifier which split the text in matched and unmatched string. Return matched string with some color or css style and unmatched. btw position of the string are untouched.
```jsx
    const getHighlightedText = (text, highlight, id, style) => {
        const parts = text?.split(new RegExp(`(${highlight})`, 'gi'));
        if (!parts) return text
        return <span style={style}> {parts.map((part, i) => {
            return <span key={`${id}${i}`} style={part.toLowerCase() === highlight.toLowerCase() ? { color: 'blueviolet', textDecoration: 'underline' } : {}}>
                {part}
            </span>
        })} </span>;
    }
```

