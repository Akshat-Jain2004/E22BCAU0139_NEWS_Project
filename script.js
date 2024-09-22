const apiKey = 'e54c0dcb0c174e1f87425770bb871fdb'; // Your NewsAPI.org API key
const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=4&apiKey=${apiKey}`;

// The container where the news will be displayed
const newsContainer = document.getElementById('newsContainer');

// Function to fetch the latest news
function fetchLatestNews() {
  fetch(newsApiUrl)
    .then(response => response.json())
    .then(data => {
      const newNews = data.articles.slice(0, 4); // Fetch only the first 4 news articles
      updateNewsFeed(newNews);
    })
    .catch(error => console.error('Error fetching news:', error));
}

// Function to update the news feed dynamically
function updateNewsFeed(newsArray) {
  newsContainer.innerHTML = ''; // Clear previous news

  newsArray.forEach(newsItem => {
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('news-item');
    
    newsDiv.innerHTML = `
      <img src="${newsItem.urlToImage || 'https://via.placeholder.com/300'}" alt="${newsItem.title}">
      <div class="news-content">
        <h3 class="news-title">${newsItem.title}</h3>
        <p class="news-description">${newsItem.description || 'No description available.'}</p>
        <div class="news-link">
          <a href="${newsItem.url}" target="_blank">Read More</a>
        </div>
      </div>
    `;
    
    newsContainer.appendChild(newsDiv);
  });
}

// Initial fetch to load news when the page loads
fetchLatestNews();
