
import React, { useState, useEffect } from 'react';
import { CalendarIcon, Loader2, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { Job, ApplicationData } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface JobApplicationFormProps {
  job: Job;
  onClose: () => void;
}

// Save CV to localStorage for demo purposes
// In a real app, this would use a backend storage solution
const saveUploadedCV = (cv: File): string => {
  // Create a mock URL for demo purposes
  const mockUrl = `uploads/${cv.name}`;
  
  // Store in localStorage (just the file name for demo)
  const previousCVs = JSON.parse(localStorage.getItem('uploadedCVs') || '[]');
  const newCV = {
    name: cv.name,
    url: mockUrl,
    uploadedAt: new Date().toISOString()
  };
  
  // Add to storage if not already there
  if (!previousCVs.some((item: any) => item.name === cv.name)) {
    previousCVs.push(newCV);
    localStorage.setItem('uploadedCVs', JSON.stringify(previousCVs));
  }
  
  return mockUrl;
};

// Get previously uploaded CVs
const getPreviouslyUploadedCVs = () => {
  return JSON.parse(localStorage.getItem('uploadedCVs') || '[]');
};

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ job, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [selectedCV, setSelectedCV] = useState<string>('new');
  const [previousCVs, setPreviousCVs] = useState<Array<{name: string, url: string, uploadedAt: string}>>([]);
  const [uploadedCV, setUploadedCV] = useState<File | null>(null);
  const [uploadFileName, setUploadFileName] = useState('');
  const [showCVOptions, setShowCVOptions] = useState(false);
  const [formData, setFormData] = useState<Partial<ApplicationData>>({
    fullName: '',
    email: '',
    phone: '',
    resumeUrl: '',
    coverLetter: '',
    portfolioUrl: '',
    yearsOfExperience: 0,
  });

  useEffect(() => {
    const savedCVs = getPreviouslyUploadedCVs();
    setPreviousCVs(savedCVs);
    setShowCVOptions(savedCVs.length > 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedCV(file);
      setUploadFileName(file.name);
      setSelectedCV('new');
    }
  };

  const handleCVSelection = (value: string) => {
    setSelectedCV(value);
    
    if (value !== 'new') {
      const selectedCVData = previousCVs.find(cv => cv.url === value);
      if (selectedCVData) {
        setFormData(prev => ({
          ...prev,
          resumeUrl: selectedCVData.url
        }));
      }
    } else {
      // If they selected "Upload new CV" but haven't uploaded yet
      if (uploadedCV) {
        setFormData(prev => ({
          ...prev,
          resumeUrl: `uploads/${uploadedCV.name}`
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          resumeUrl: ''
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, this would upload the file to a server
    let cvUrl = formData.resumeUrl;
    
    if (selectedCV === 'new' && uploadedCV) {
      // Save the uploaded CV
      cvUrl = saveUploadedCV(uploadedCV);
    }
    
    // Update form data with the CV URL
    const applicationData = {
      ...formData,
      resumeUrl: cvUrl,
      availableStartDate: date ? format(date, 'yyyy-MM-dd') : undefined
    };
    
    // In a real app, this would send data to a server
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Application Submitted",
      description: `Your application for ${job.title} at ${job.company} has been sent successfully.`,
    });
    
    // Refresh CV list in case a new one was added
    setPreviousCVs(getPreviouslyUploadedCVs());
    
    setLoading(false);
    onClose();
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Apply for {job.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>
        
        {/* CV Upload Section */}
        <div className="space-y-3">
          <Label>Resume / CV</Label>
          
          {showCVOptions && (
            <RadioGroup value={selectedCV} onValueChange={handleCVSelection} className="mb-3">
              {previousCVs.map((cv, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={cv.url} id={`cv-${index}`} />
                  <Label htmlFor={`cv-${index}`} className="cursor-pointer">
                    {cv.name} <span className="text-xs text-muted-foreground">
                      (uploaded on {new Date(cv.uploadedAt).toLocaleDateString()})
                    </span>
                  </Label>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new-cv" />
                <Label htmlFor="new-cv" className="cursor-pointer">Upload a new CV</Label>
              </div>
            </RadioGroup>
          )}
          
          {(selectedCV === 'new' || !showCVOptions) && (
            <div className="border border-input rounded-md p-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="cv-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF or DOCX (MAX. 10MB)</p>
                  </div>
                  <Input
                    id="cv-upload"
                    type="file"
                    accept=".pdf,.docx,.doc"
                    className="hidden"
                    onChange={handleFileUpload}
                    required={selectedCV === 'new' || !showCVOptions}
                  />
                </label>
              </div>
              {uploadFileName && (
                <div className="mt-2 text-sm text-green-600 flex items-center">
                  <div className="mr-2">✓</div>
                  {uploadFileName} selected
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Resume URL field - hidden but kept for compatibility */}
        <Input
          type="hidden"
          name="resumeUrl"
          value={formData.resumeUrl}
        />
        
        <div>
          <Label htmlFor="portfolioUrl">Portfolio URL (Optional)</Label>
          <Input
            id="portfolioUrl"
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={handleChange}
            placeholder="https://johndoe.com"
          />
        </div>
        
        <div>
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <Input
            id="yearsOfExperience"
            name="yearsOfExperience"
            type="number"
            min="0"
            value={formData.yearsOfExperience}
            onChange={handleNumberChange}
            placeholder="3"
          />
        </div>
        
        <div>
          <Label>Available Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label htmlFor="coverLetter">Cover Letter</Label>
          <Textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            className="h-32"
            required
          />
        </div>
        
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;
