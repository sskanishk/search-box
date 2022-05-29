import { useEffect } from 'react'

import styled from 'styled-components'


function SearchInput({ searchHandler, inputRef }) {

    useEffect(() => {
        setFocus()
    }, [])

    const setFocus = () => {
        inputRef?.current && inputRef.current.focus()
    }

    return (
        <div className="search_input__wrapper">
            <input
                placeholder='Search user by name, address, id, pincode'
                ref={inputRef}
                autoComplete='off'
                type='search'
                name='query'
                onChange={(e) => searchHandler(e.target.value.toLowerCase())}
            />
        </div>
    )
}

export default SearchInput