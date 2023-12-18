import NewPost from "@/components/NewPost";
import Posts from "@/components/Posts";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
      <h1 style={{ color: "#BD2A2E", textAlign: "center" }}>Spammer</h1>
      <NewPost />
      <Posts />
    </div>
  );
}
