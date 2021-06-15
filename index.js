const container = document.querySelector(".container");

// store last document
let latestDoc = null;

const getNextReviews = async () => {
  const ref = db
    .collection("reviews")
    .orderBy("createdAt")
    .startAfter(latestDoc || 0)
    .limit(6);

  const data = await ref.get();

  // output docs
  let template = "";
  data.docs.forEach((doc) => {
    const review = doc.data();
    template += `
      <div class="card">
        <h2>${review.title}</h2>
        <p>Written by ${review.author}</p>
        <p>Rating - ${review.rating} / 5</p>
      </div>
    `;
  });

  container.innerHTML += template;

  // update latest doc
  latestDoc = data.docs[data.docs.length - 1];
};

window.addEventListener("DOMContentLoaded", () => getNextReviews());

const loadMore = document.querySelector(".load-more button");
const handleClick = () => {
  getNextReviews();
};

loadMore.addEventListener("click", handleClick);
