const GITHUB_USERNAME = 'houmairi';

/**
 * Fetches GitHub contribution count for a given year
 * @param {number} year - The year to fetch contributions for
 * @returns {Promise<number>} The total contribution count
 */
export async function getContributionCount(year = new Date().getFullYear()) {
  try {
    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;
    
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // For production, add your GitHub token here:
        // 'Authorization': `Bearer ${import.meta.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({ query })
    });
    
    const data = await response.json();
    return data.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 371;
  } catch (error) {
    console.error('Failed to fetch GitHub contribution count:', error);
    // Fallback to last known count
    return 371;
  }
}

/**
 * Gets the GitHub profile URL
 * @returns {string} GitHub profile URL
 */
export function getGitHubProfileUrl() {
  return `https://github.com/${GITHUB_USERNAME}`;
}

/**
 * Gets the GitHub contributions URL for a specific year
 * @param {number} year - The year to show contributions for
 * @returns {string} GitHub contributions URL
 */
export function getGitHubContributionsUrl(year = new Date().getFullYear()) {
  return `https://github.com/${GITHUB_USERNAME}?tab=overview&from=${year}-01-01&to=${year}-12-31`;
}
