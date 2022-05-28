import React from 'react'
import styled from 'styled-components'

function Result(props) {
    console.log('x', props) 
    return (
        <StyledResult data={props.data}>
            {
                props.data.map((val) => {
                    return resultCard(val, props.highlight, val.id)
                })
            }
        </StyledResult>
    )
}

const resultCard = (val, highlight, key) => {
    const style = {
        id: {
            fontSize: '16px',
            fontWeight: '500'
        },
        name: {
            fontSize: '16px',
            padding: '5px 0px',
            fontStyle: 'italic'
        },
        address: {
            color: 'gray'
        }
    }

    return (
        <StyledResultItem key={val.id} 
        onKeyDown={(e) => handleSetHighligthedItem({ e })}
        onClick={(e) => handleSetHighligthedItem({ e })}
        >
            <div>
                {getHighlightedText(val.name, highlight, key, style.name)}
                {getHighlightedText(val.id, highlight, key, style.id)}
            </div>
                {getHighlightedText(val.address, highlight, key, style.address)}
        </StyledResultItem>
    )
}

const getHighlightedText = (text, highlight, id, style) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text?.split(new RegExp(`(${highlight})`, 'gi'));
    if(!parts) return text
    return <p style={style}> { parts.map((part, i) => {
        return <span style={part.toLowerCase() === highlight.toLowerCase() ? { color: 'blueviolet' } : {} }>
                { part }
            </span>
    })} </p>;
}

const handleSetHighligthedItem = (e) => {
    console.log('eeee ==> ', e)
}


const StyledResult = styled.div`
    // padding: 0;
    max-height: 280px;
    overflow-y: auto;
    // opacity: 0;
    // pointer-events: none;

    padding: 10px 8px;
    opacity: 1;
    pointer-events: auto;

    background-color: white;
    border-radius: 5px;

    display: ${(props) => props.data.length > 0 ? 'block' : 'none' };

`

const StyledResultItem = styled.li`
    list-style-type: none;
    padding: 10px 12px;
    width: 100%;
    border-radius: 3px;
    border: 0.3px solid lightgray;
    margin: 5px 0px;
    // &:hover {
    //     background-color: red;
    // }
    &:focus {
        background-color: yellow;
    }
    > div {
        display: flex; 
        justify-content: space-between; 
        align-items: center
    }
`

export default Result