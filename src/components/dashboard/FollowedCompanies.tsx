
import React from 'react';
import { FollowedCompany } from '@/lib/types';
import { useFollowCompany } from '@/hooks/use-follow-company';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, UserMinus, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const FollowedCompanies: React.FC = () => {
  const { getFollowedCompanies } = useFollowCompany("0"); // The "0" is just for initialization
  const followedCompanies = getFollowedCompanies();
  const { toast } = useToast();

  const handleUnfollow = (company: FollowedCompany) => {
    // Create a custom hook instance for this specific company
    const { toggleFollow } = useFollowCompany(company.companyId);
    toggleFollow();
    
    toast({
      title: "Unfollowed",
      description: `You are no longer following ${company.companyName}`,
    });
  };

  if (followedCompanies.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Followed Companies</CardTitle>
          <CardDescription>Companies you're interested in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Building className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-4">You aren't following any companies yet.</p>
            <Button asChild>
              <Link to="/jobs">Find Companies to Follow</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Followed Companies</CardTitle>
        <CardDescription>Companies you're interested in</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {followedCompanies.map((company) => (
            <div key={company.id} className="flex items-center justify-between border-b pb-3 last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center">
                  {company.companyLogo ? (
                    <img src={company.companyLogo} alt={company.companyName} className="h-full w-full object-cover rounded-md" />
                  ) : (
                    <Building className="h-5 w-5 text-job-blue" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{company.companyName}</div>
                  <div className="text-xs text-muted-foreground">
                    Following since {new Date(company.followedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/company/${company.companyId}`}>
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">View company</span>
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleUnfollow(company)}
                >
                  <UserMinus className="h-4 w-4" />
                  <span className="sr-only">Unfollow</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowedCompanies;
