import Result from "./Result"
import styled from 'styled-components'

import SearchInput from "./SearchInput"
import "../assets/main.css"
import { useState, useEffect } from "react"

function SearchBox() {
    const [apidata, setApidata] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
      const getData = () => {
        fetch('http://www.mocky.io/v2/5ba8efb23100007200c2750c')
          .then(response => response.json())
          .then(json => setApidata(json))
      }
      getData()
    },[])

    const searchHandler = (eventVal) => {
        setQuery(eventVal)
    }

    const filterdData = apidata.filter((item) => {
        const { id, name, address, pincode  } = item
        // if(query.length <= 0) {
        //     console.log("query.length ===> ", query.length)
        //     return []
        // } else {
            let result = name.toLowerCase().indexOf(query) >= 0 || id.toLowerCase().indexOf(query) >= 0 || address.toLowerCase().indexOf(query) >= 0 || pincode.toLowerCase().indexOf(query) >= 0 
            console.log("filterdata ==> ", result)
            return result
        // } 
    })

    return (
        <StyledSearchBox>
            <SearchInput searchHandler={searchHandler}/>
            <Result data={filterdData} highlight={query}/>
        </StyledSearchBox>
    )
}

const StyledSearchBox = styled.div`
    max-width: 450px;
    margin: 150px auto;
    position: relative;
    background-color: #fff;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.12);
`

export default SearchBox