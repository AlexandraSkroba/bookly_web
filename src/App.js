import { Layout } from "./components/Layout";

function App() {
  return (
    <Layout>
      <img className="img-books" src="/books.png" alt="books" />
      <div className="inter-text">
        <h2>Exchange Books, Discover Stories</h2>
        <p>Join a community of readers sharing and discovering new books. List
            your books, find exciting reads, connect with others, and track
            exchanges—all in one place! Let's make book swapping simple and
            enjoyable.</p>
      </div>
    </Layout>
  );
}

export default App;
