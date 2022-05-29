import React, { useEffect } from 'react'
import '../assets/main.css'

function ResultView({ data, highlight, resultRef, inputRef }) {

    useEffect(() => {
        if (data.length > 0) {
            document.body.addEventListener('keydown', onKeyDown)
            document.body.addEventListener('mousemove', onMouseMove)
        } else {
            document.body.removeEventListener('keydown', onKeyDown)
        }
        return () => {
            document.body.removeEventListener('keydown', onKeyDown)
        }
    }, [data])


    function onKeyDown(event) {

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

    function onMouseMove(sadf) {
        inputRef.current.focus()
    }

    const getHighlightedText = (text, highlight, id, style) => {
        const parts = text?.split(new RegExp(`(${highlight})`, 'gi'));
        if (!parts) return text
        return <span style={style}> {parts.map((part, i) => {
            return <span key={`${id}${i}`} style={part.toLowerCase() === highlight.toLowerCase() ? { color: 'blueviolet', textDecoration: 'underline' } : {}}>
                {part}
            </span>
        })} </span>;
    }

    const style = {
        id: {
            fontSize: '16px',
            fontWeight: '500',
            color: 'black'
        },
        name: {
            fontSize: '16px',
            padding: '5px 0px',
            fontStyle: 'italic',
            color: 'black'
        },
        address: {
            color: 'gray',
            fontSize: '14px'
        }
    }

    if(data?.length > 0) {
        return (
            <ul data={data} ref={resultRef} className="result__container">
                {
                    data.map((val, index) => {
                        return (
                            <li key={`${val.url}${index}`}>
                                <a href="#" key={val.url}>
                                    <div className='hight_item'>    
                                        <div className='hight_item_'>
                                            {getHighlightedText(val.name, highlight, val.id, style.name)}
                                            <div className='result_card_fields'>
                                                <p>Id: &nbsp; </p>{getHighlightedText(val.id, highlight, val.id, style.address)} 
                                            </div>
                                        </div>
                                        
                                        <div className='result_card_fields'>
                                            <p>Address: &nbsp; </p>{getHighlightedText(val.address, highlight, val.id, style.address)} 
                                        </div>
                                        <div className='result_card_fields'>
                                            <p>Pincode: &nbsp; </p>
                                            {getHighlightedText(val.pincode, highlight, val.id, style.address)}
                                        </div>
                                        <div className='result_card_fields'>
                                            <p>Items: &nbsp; </p>
                                            {getHighlightedText(val.items.join(', '), highlight, val.id, style.address)}
                                        </div>
                                    </div>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        )
    } else {
        return (
            <div className='no_result__wrapper'>
                <p>No Results Found</p>
            </div>
        )
    }

    
}

export default ResultView