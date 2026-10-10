
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || ''
).replace(/\/+$/, '');

async function request(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}/api${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      error || `Request failed: ${response.status}`
    );
  }

  return response.json();
}

export async function getPersons(language = 'te') {
  return request(`/persons/?lang=${language}`);
}

export async function getPerson(personId, language = 'te') {
  return request(`/persons/${personId}?lang=${language}`);
}

export async function testDatabase() {
  return request('/test-db');
}

export async function getArticles() {
  return request('/articles/');
}

export async function getArticle(articleId) {
  return request(`/articles/${articleId}`);
}
