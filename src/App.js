import "./App.css";
// Importam custom hook-urile.
import { useFetch } from "./hooks/useFetch";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  // Pentru a folosi custom hook-ul useFetch, il apelam, dandu-i ca argument url-ul.
  const users = useFetch("https://jsonplaceholder.typicode.com/users");
  const posts = useFetch("https://jsonplaceholder.typicode.com/posts");

  // Pentru a folosi custom hook-ul useLocalStorage, il apelam, dandu-i ca argumente cheia din local storage si valoarea asociata.
  const [favUser, setFavUser] = useLocalStorage("favUser", null);
  const [displayCategory, setDisplayCategory] = useLocalStorage(
    "displayCategory",
    "users"
  );

  function handleUsersClick() {
    // Adaugam noua valoare pentru cheia displayedCategory din localStorage.
    setDisplayCategory("users");
  }

  function handlePostsClick() {
    // Adaugam noua valoare pentru cheia displayedCategory din localStorage.
    setDisplayCategory("posts");
  }

  function handleUserClick(name, email) {
    // Adaugam noua valoare pentru cheia users din localStorage.
    setFavUser({
      name,
      email,
    });
  }

  return (
    <div className="App">
      <button onClick={handleUsersClick}>Afiseaza useri</button>
      <button onClick={handlePostsClick}>Afiseaza postarile</button>

      <h1>User Favorit</h1>
      {/* Afisam userul favorit. */}
      {favUser ? (
        <div>
          <h2>{favUser.name}</h2>
          <p>{favUser.email}</p>
        </div>
      ) : (
        <p>Nu ai selectat userul favorit</p>
      )}

      <br />
      {/* Avand in vedere ca useFetch returneaza null in prima faza, avem de pus o extra conditie. */}
      {/* Daca categoria afisata pe ecran este users si daca avem useri, ii afisam pe ecran. */}
      {displayCategory === "users" &&
        users &&
        users.map((user) => {
          return (
            <div
              key={user.id}
              onClick={() => handleUserClick(user.name, user.email)}
            >
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          );
        })}

      <br />
      {/* Avand in vedere ca useFetch returneaza null in prima faza, avem de pus o extra conditie. */}
      {/* Daca categoria afisata pe ecran este posts si daca avem postarile, le afisam pe ecran. */}
      {displayCategory === "posts" &&
        posts &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
