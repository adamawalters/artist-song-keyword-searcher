import { ChangeEvent, FormEvent, useState } from 'react'

type SearchFormProps = {
    handleSearch: (searchKey: string)=> Promise<void>
}

const SearchForm = ({handleSearch}: SearchFormProps) => {

    const [searchKey, setSearchKey] = useState("")

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setSearchKey(e.target.value)
    }

    function handleSubmit(e: FormEvent<HTMLFormElement> ){
        e.preventDefault();
        handleSearch(searchKey);
    }

    const form = (
        <form onSubmit={handleSubmit} >
            <label htmlFor='artistSearch'>Enter an artist</label>
            <input type='text' name='artistSearch' required onChange={handleChange}/>
            <button type='submit'>Submit</button>
        </form>
    )

     
  return (
    <>{form}</>
  )
}

export default SearchForm