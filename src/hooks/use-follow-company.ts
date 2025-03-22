
import { useState, useEffect } from 'react';
import { FollowedCompany } from '@/lib/types';

const STORAGE_KEY = 'harpal_followed_companies';

export const useFollowCompany = (companyId: string) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  // Load followed companies from localStorage
  useEffect(() => {
    const loadFollowedCompanies = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const companies = JSON.parse(storedData) as FollowedCompany[];
          const isCurrentlyFollowing = companies.some(company => company.companyId === companyId);
          setIsFollowing(isCurrentlyFollowing);
          
          // Get mock follower count (would come from API in real app)
          setFollowerCount(Math.floor(Math.random() * 500) + 50);
        }
      } catch (error) {
        console.error('Error loading followed companies:', error);
      }
    };

    loadFollowedCompanies();
  }, [companyId]);

  // Toggle follow/unfollow
  const toggleFollow = () => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      const companies: FollowedCompany[] = storedData ? JSON.parse(storedData) : [];

      if (isFollowing) {
        // Unfollow: remove company from the list
        const updatedCompanies = companies.filter(company => company.companyId !== companyId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompanies));
        setFollowerCount(prev => Math.max(0, prev - 1));
      } else {
        // Follow: add company to the list
        const newFollowedCompany: FollowedCompany = {
          id: `follow_${Date.now()}`,
          companyId: companyId,
          companyName: "Company Name", // This would come from the API
          followedAt: new Date().toISOString()
        };
        const updatedCompanies = [...companies, newFollowedCompany];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompanies));
        setFollowerCount(prev => prev + 1);
      }
      
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error updating followed companies:', error);
    }
  };

  // Get all followed companies
  const getFollowedCompanies = (): FollowedCompany[] => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('Error getting followed companies:', error);
      return [];
    }
  };

  return {
    isFollowing,
    toggleFollow,
    followerCount,
    getFollowedCompanies
  };
};
