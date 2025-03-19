
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Job } from '@/lib/types';

interface ShareJobModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const ShareJobModal: React.FC<ShareJobModalProps> = ({ job, isOpen, onClose }) => {
  const jobUrl = window.location.href;

  const shareOptions = [
    {
      name: 'Email',
      icon: '📧',
      onClick: () => {
        window.open(`mailto:?subject=Job Opening: ${job.title} at ${job.company}&body=Check out this job opening: ${jobUrl}`);
      }
    },
    {
      name: 'LinkedIn',
      icon: '🔗',
      onClick: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`);
      }
    },
    {
      name: 'Twitter',
      icon: '🐦',
      onClick: () => {
        window.open(`https://twitter.com/intent/tweet?text=Check out this job opening: ${job.title} at ${job.company}&url=${encodeURIComponent(jobUrl)}`);
      }
    },
    {
      name: 'Facebook',
      icon: '👥',
      onClick: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`);
      }
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      onClick: () => {
        window.open(`https://wa.me/?text=Check out this job opening: ${job.title} at ${job.company} - ${jobUrl}`);
      }
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jobUrl);
    toast({
      title: "Link copied!",
      description: "Job URL has been copied to clipboard.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this job</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="flex items-center space-x-2 mb-4">
          <div className="grid flex-1 gap-2">
            <Input
              value={jobUrl}
              readOnly
              className="w-full"
            />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={copyToClipboard}>
            <span className="sr-only">Copy</span>
            Copy
          </Button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              variant="outline"
              className="flex flex-col items-center justify-center h-16 p-2"
              onClick={option.onClick}
            >
              <span className="text-lg mb-1">{option.icon}</span>
              <span className="text-xs">{option.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareJobModal;
