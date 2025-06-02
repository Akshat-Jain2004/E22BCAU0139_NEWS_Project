// TheNewsAPI Token
const apiToken = 'POBpWOEXB4GvDjExVrGuFPtPYtb9ZZ2oUd07Z7ke';

// API URL for top headlines (US, limit 4)
const newsApiUrl = `https://api.thenewsapi.com/v1/news/top?api_token=${apiToken}&locale=us&limit=4`;

// Container to inject news items
const newsContainer = document.getElementById('newsContainer');

// Fetch latest news and update UI
function fetchLatestNews() {
  fetch(newsApiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data && data.data) {
        updateNewsFeed(data.data.slice(0, 4)); // Extract top 4 articles
      } else {
        newsContainer.innerHTML = '<p>No news articles found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    });
}

// Render news articles in the DOM
function updateNewsFeed(newsArray) {
  newsContainer.innerHTML = ''; // Clear any existing content

  newsArray.forEach(newsItem => {
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('news-item');

    newsDiv.innerHTML = `
      <img src="${newsItem.image_url || 'https://via.placeholder.com/300'}" alt="${newsItem.title}">
      <div class="news-content">
        <h3 class="news-title">${newsItem.title}</h3>
        <p class="news-description">${newsItem.description || 'No description available.'}</p>
        <div class="news-link">
          <a href="${newsItem.url}" target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
      </div>
    `;

    newsContainer.appendChild(newsDiv);
  });
}

// Load news on page load
fetchLatestNews();
