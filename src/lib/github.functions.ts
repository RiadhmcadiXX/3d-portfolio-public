import { createServerFn } from "@tanstack/react-start";

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: {
    contributionDays: ContributionDay[];
  }[];
}

// Simple in-memory cache for 1 hour to prevent hitting rate limits
let cachedCalendar: ContributionCalendar | null = null;
let lastFetched = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export const getGitHubContributions = createServerFn({ method: "GET" }).handler(
  async (): Promise<ContributionCalendar | null> => {
    const now = Date.now();
    if (cachedCalendar && now - lastFetched < CACHE_TTL) {
      return cachedCalendar;
    }

    const token = process.env['GITHUB_TOKEN'];
    const username = process.env['GITHUB_USERNAME'];

    if (!token || !username) {
      console.warn("GITHUB_PAT or GITHUB_USERNAME is missing");
      return null;
    }

    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "Portfolio-App",
        },
        body: JSON.stringify({
          query: QUERY,
          variables: { username },
        }),
      });

      if (!res.ok) throw new Error(`GitHub API error: ${res.statusText}`);

      const data = await res.json();
      const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;

      if (calendar) {
        cachedCalendar = calendar;
        lastFetched = now;
      }

      return calendar;
    } catch (err) {
      console.error("Failed to fetch GitHub contributions:", err);
      return null;
    }
  }
);
