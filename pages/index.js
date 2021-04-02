import { GetStaticProps } from "next";
var urlMarca = "http://fipeapi.appspot.com/api/1/carros/marcas.json";
var urlModelo = "http://fipeapi.appspot.com/api/1/carros/veiculos/{$brandId}.json";
var urlAno = "http://fipeapi.appspot.com/api/1/carros/veiculo/{$brandId}/{$vehicleId}.json";

function Blog({ posts }) {
  return (
    <select name="cars" id="key">
      {posts.map((post) => (
        <option value={post.id}>{post.name}</option>
      ))}
    </select>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch(urlMarca);
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export default Blog;
