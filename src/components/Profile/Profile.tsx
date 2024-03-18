import { useUserContext } from "../../utils/context"
import TopSongs from "./TopSongs"

function Profile() {

  const { userToken } = useUserContext();

  return (
    <main>
      <h1>Hi, {userToken.profile.display_name}</h1>
      <p>On this page you can perform searches and save and edit your searches. You can also see your top songs!</p>
      <TopSongs />
    </main>
  )
}

export default Profile