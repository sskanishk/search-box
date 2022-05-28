import { useEffect, useRef } from 'react'

import styled from 'styled-components'


function SearchInput({ searchHandler }) {
    const ref = useRef(null)
    let manualFocus = true

    useEffect(() => {
        setFocus()
    },[])

    const setFocus = () => {
        manualFocus = false
        ref?.current && ref.current.focus()
        manualFocus = true
    }


    return (
        <StyledSearchInput>
            <input 
                ref={ref}
                type='text'
                onChange={(e) => searchHandler(e.target.value.toLowerCase())}
            />
        </StyledSearchInput>
    )
}

const StyledSearchInput = styled.div`
    > input {
        width: 100%;
        height: 55px;
        border: none;
        outline: none;
        border-radius: 5px;
        padding: 0 60px 0 20px;
        font-size: 18px;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    }
`

export default SearchInput