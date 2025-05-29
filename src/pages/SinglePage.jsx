import { Link, useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useEffect, useState } from "react"
import Button from "../components/Button"

function SinglePage(){
    const navigate = useNavigate()
    const {id} = useParams()
    const[book,setBook] = useState({})
    const fetchBook = async()=>{
        const response = await axios.get(`http://localhost:3000/api/books/${id}`)
        setBook(response.data.datas)
    }
    useEffect(()=>{
        fetchBook()
    },[])

    const deleteBook = async()=>{
        const response = await axios.delete("http://localhost:3000/api/books/" + id)
        if(response.status === 200){
            navigate("/")
        }else{
            alert("Something went wrong")
        }
    }

    return(
        <>
        <Navbar />
        <h1>{book.bookName}</h1>
        <h1>{book.price}</h1>
        <h1>{book.bookAuthor}</h1>
        <button onClick={deleteBook}>Delete</button>
        <Link to={`/edit-page/${book.id}`}><button>Edit book</button></Link>
        </>
    )
}

export default SinglePage