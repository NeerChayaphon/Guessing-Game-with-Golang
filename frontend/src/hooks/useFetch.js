import {useState, useEffect} from 'react'

const useFetch = (url,requestOptions) => {
    const [data,setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url,requestOptions)
            const json = await res.json()

            setData(json)
        }

        fetchData()
    },[url])

    return {data}
}

export default useFetch