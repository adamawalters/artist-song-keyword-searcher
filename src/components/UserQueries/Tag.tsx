import { TagType } from "Types"
import { deleteTag, updateTag } from "../../utils/api"
import { useState } from "react"


type TagProps = {
    tag: TagType
    fetchQueries: () => Promise<void>
}

function Tag({tag, fetchQueries}: TagProps) {

   const [updatedTag, setUpdatedTag] = useState(tag.tag)
   

   async function handleUpdate(){
        await updateTag(tag._id, updatedTag)
        await fetchQueries
   }

  async function removeTag(){
    await deleteTag(tag._id)
    await fetchQueries()
  }
 

  return (
    <div className="tag-item query-wrapper-row">
        <input value={updatedTag} onChange={(e)=>setUpdatedTag(e.target.value)}/>
        <button onClick={handleUpdate}>Save Tag Edit</button>
        <i className="fa-solid fa-xmark" onClick={()=>removeTag}></i>
    </div>
  )
}

export default Tag