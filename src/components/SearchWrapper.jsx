import React, { useState, useEffect, useRef } from "react"

import SearchInput from "./SearchInput"
import ResultView from "./ResultView"

import "../assets/main.css"


function SearchBox() {
    const resultRef = useRef(null)
    const inputRef = useRef(null)

    const [apidata, setApidata] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        const getData = () => {
            fetch('https://www.mocky.io/v2/5ba8efb23100007200c2750c')
                .then(response => response.json())
                .then(json => setApidata(json))
        }
        getData()
    }, [])

    const searchHandler = (eventVal) => {
        setQuery(eventVal)
    }

    const filterdData = apidata.filter((item) => {
        const { id, name, address, pincode, items } = item
        if (query.length <= 0) {
            return []
        } else {
            let result = name.toLowerCase().indexOf(query) >= 0 || id.toLowerCase().indexOf(query) >= 0 || address.toLowerCase().indexOf(query) >= 0 || pincode.toLowerCase().indexOf(query) >= 0 || items.join(', ').toLowerCase().indexOf(query) >= 0 
            return result
        }
    })

    return (
        <div className="searchbox__wrapper">
            <SearchInput searchHandler={searchHandler} inputRef={inputRef} />
            {
                query.length > 0
                    ? <ResultView
                        data={filterdData}
                        highlight={query}
                        resultRef={resultRef}
                        inputRef={inputRef}
                    />
                    : null
            }

        </div>
    )
}

export default SearchBox
