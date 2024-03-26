import { TagType } from "Types"
import { deleteTag } from "../../utils/api"


type TagProps = {
    tag: TagType
    fetchQueries: () => Promise<void>
}

function Tag({tag, fetchQueries}: TagProps) {

  async function removeTag(){
    await deleteTag(tag._id)
    fetchQueries()
  }
 

  return (
    <div className="tag-item query-wrapper-row">
        {tag.tag}
        <i className="fa-solid fa-xmark" onClick={()=>removeTag}></i>
    </div>
  )
}

export default Tag