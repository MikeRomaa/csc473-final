import { getCurrentUser } from "@/lib/cookies";
import { addFriend, getAllFriends } from "./action";
import Home from "./components/Friends";

export default async function Page() {
  let user = await getCurrentUser();

  return (
    <div className="relative">
      <Home user={user} />
    </div>
  );
}
